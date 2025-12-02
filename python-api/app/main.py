import os
import shutil
import uuid
from pathlib import Path
from typing import Union

import app.services.video_conversion as videoConversionService
import redis
from app.database import Base, engine, get_db
from app.models.conversion import Conversion
from app.validation.conversion_object import ConversionObject
from fastapi import Depends, FastAPI, APIRouter, Form, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

Base.metadata.create_all(bind=engine)

router = APIRouter(prefix="/api")

REDIS_HOST = os.getenv("REDIS_HOST", "vidflow-redis")
REDIS_PORT = os.getenv("REDIS_PORT", 6379)
r = redis.Redis(host=REDIS_HOST, port=REDIS_PORT)

STREAM_NAME = "conversions"
GROUP_NAME = "vidflow-workers"
CONSUMER_NAME = "consumer-1"

# Create consumer group if it doesn't exist
try:
    r.xgroup_create(STREAM_NAME, GROUP_NAME, id="0-0", mkstream=True)
except redis.exceptions.ResponseError as e:
    if "BUSYGROUP" not in str(e):
        raise e


@router.get("/")
def read_root():
    return {"Hello": "World2"}


@router.post("/video/convert")
async def convert_video(
    target_format: str = Form(),
    file: UploadFile = File(...),
    db=Depends(get_db)
):
    """
    Upload and queue video conversion job
    """
    upload_dir = Path("/usr/src/app/media")
    upload_dir.mkdir(parents=True, exist_ok=True)

    original_name = Path(file.filename).stem
    ext = Path(file.filename).suffix.lower()
    random_suffix = uuid.uuid4().hex[:8]

    stored_file_name = f"{original_name}-{random_suffix}{ext}"
    original_path = upload_dir / stored_file_name

    # Stream the file to disk in chunks (memory efficient)
    try:
        with original_path.open("wb") as buffer:
            while chunk := await file.read(1024 * 1024):  # Read 1MB at a time
                buffer.write(chunk)
    except Exception as e:
        # Clean up partial file on error
        if original_path.exists():
            original_path.unlink()
        raise e

    converted_file_name = f"{original_name}-{random_suffix}-converted.{target_format}"

    from_format = ext.lstrip('.')  # Remove the dot
    to_format = target_format

    create_conversion_record = videoConversionService.create_conversion(
        db,
        from_format=from_format,
        to_format=to_format,
        original_path=stored_file_name
    )

    convert_ob = ConversionObject(
        conversion_id=create_conversion_record.id,
        original_path=stored_file_name,
        final_path=converted_file_name,
        created_at=create_conversion_record.created_at
    )
    videoConversionService.queue_conversion_job(r, STREAM_NAME, convert_ob)

    return {
        "conversion_id": create_conversion_record.id,
        "target_format": target_format,
        "file_name": stored_file_name,
        "saved_to": str(original_path.resolve()),
    }


@router.get("/conversion-status/{conversion_id}")
def get_conversion_data(conversion_id: uuid.UUID, db=Depends(get_db)):
    conversion = videoConversionService.get_conversion_status(db=db, conversion_id=str(conversion_id))
    return conversion


@router.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)