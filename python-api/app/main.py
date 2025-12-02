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
from fastapi import Depends, FastAPI, APIRouter, Form, File, UploadFile, HTTPException
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


@router.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "vidflow-api"}


@router.post("/video/convert")
async def convert_video(
    target_format: str = Form(...),
    file: UploadFile = File(...),
    db=Depends(get_db)
):
    """
    Upload and queue video conversion job
    Optimized for large file streaming with no buffering
    """
    # Validate file
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")

    upload_dir = Path("/usr/src/app/media")
    upload_dir.mkdir(parents=True, exist_ok=True)

    original_name = Path(file.filename).stem
    ext = Path(file.filename).suffix.lower()
    random_suffix = uuid.uuid4().hex[:8]

    stored_file_name = f"{original_name}-{random_suffix}{ext}"
    original_path = upload_dir / stored_file_name

    # Stream the file to disk in larger chunks for better performance
    try:
        with original_path.open("wb") as buffer:
            # Use 10MB chunks for faster writes (adjust based on your needs)
            while chunk := await file.read(10 * 1024 * 1024):
                buffer.write(chunk)
    except Exception as e:
        # Clean up partial file on error
        if original_path.exists():
            original_path.unlink()
        raise HTTPException(
            status_code=500,
            detail=f"Failed to save file: {str(e)}"
        )
    finally:
        # Always close the file
        await file.close()

    converted_file_name = f"{original_name}-{random_suffix}-converted.{target_format}"

    from_format = ext.lstrip('.')  # Remove the dot
    to_format = target_format

    try:
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

    except Exception as e:
        # Clean up uploaded file if database/queue operations fail
        if original_path.exists():
            original_path.unlink()
        raise HTTPException(
            status_code=500,
            detail=f"Failed to queue conversion: {str(e)}"
        )

    return {
        "conversion_id": create_conversion_record.id,
        "target_format": target_format,
        "file_name": stored_file_name,
        "original_size_bytes": original_path.stat().st_size,
        "status": "queued"
    }


@router.get("/conversion-status/{conversion_id}")
def get_conversion_data(conversion_id: uuid.UUID, db=Depends(get_db)):
    """Get conversion status by ID"""
    conversion = videoConversionService.get_conversion_status(
        db=db,
        conversion_id=str(conversion_id)
    )

    if not conversion:
        raise HTTPException(status_code=404, detail="Conversion not found")

    return conversion


@router.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


app = FastAPI(title="Vidflow API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)