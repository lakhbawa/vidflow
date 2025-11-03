from pathlib import Path
import shutil
from typing import Union
import uuid

from fastapi import FastAPI, APIRouter, Form, File, UploadFile

router = APIRouter(prefix="/api")

@router.get("/")
def read_root():
    return {"Hello": "World2"}

@router.post("/video/convert")
def convert_video(target_format: str = Form(), file: UploadFile = File()):
    upload_dir = Path("/usr/src/app/media")
    upload_dir.mkdir(parents=True, exist_ok=True)

    original_name = Path(file.filename).stem
    ext = Path(file.filename).suffix.lower()
    random_suffix = uuid.uuid4().hex[:8]
    
    stored_file_name = f"{original_name}-{random_suffix}{ext}"
    file_path = upload_dir / stored_file_name

    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "target_format": target_format,
        "file_name": stored_file_name,
        "saved_to": str(file_path.resolve()),
    }
    

@router.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

app = FastAPI()
app.include_router(router)