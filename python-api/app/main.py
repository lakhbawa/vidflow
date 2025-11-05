from datetime import datetime
from pathlib import Path
import shutil
import subprocess
from typing import Union
import uuid
import redis
import app.services.video_conversion as videoConversionService
from app.validation.conversion_object import ConversionObject
from app.database import Base, engine, get_db
from fastapi import Depends, FastAPI, APIRouter, Form, File, UploadFile
from app.models.conversion import Conversion
Base.metadata.create_all(bind=engine)


router = APIRouter(prefix="/api")
r = redis.Redis(host='redis', port=6379)

STREAM_NAME = "conversions"
GROUP_NAME = "vidflow-workers"
CONSUMER_NAME = "consumer-1"

# Create consumer group if it doesn't exist
try:
    r.xgroup_create(STREAM_NAME, GROUP_NAME, id="0-0", mkstream=True)
except redis.exceptions.ResponseError as e:
    # Ignore if group already exists
    if "BUSYGROUP" not in str(e):
        raise e

@router.get("/")
def read_root():
    return {"Hello": "World2"}

# @router.get("/redis-producer-test")
# def redis_test(db=Depends(get_db)):
#
#     conversion_id = '12'
#     from_format='mp4',
#     to_format='mp3',
#     original_path="placeholder"
#
#     convert = videoConversionService.create_conversion(db, from_format=from_format, to_format=to_format, original_path=original_path)
#
#     convert_ob = ConversionObject(conversion_id=convert.id, file_path:'', created_at=convert.created_at)
#     entry_id = videoConversionService.queue_conversion_job(r, STREAM_NAME, convert_ob)
#     # entry_id = r.xadd(STREAM_NAME, {'conversion_id': 1, 'file_path': '__file__'})
#     # print(f"Added entry with ID: {entry_id}")
#     return {
#         "entry_id": entry_id
#     }
@router.get('/redis-consumer-test')
def redis_consumer():
    try:
        messages = r.xreadgroup(
            groupname=GROUP_NAME,
            consumername=CONSUMER_NAME,
            streams={STREAM_NAME: ">"}, # message not processed
            count=10,
            block=5000  # wait 5 seconds
        )

        output = []
        for stream_name, message_list in messages:
            for message_id, message_data in message_list:
                output.append({
                    "stream": stream_name,
                    "id": message_id,
                    "data": message_data
                })
                print(f"Stream: {stream_name}, ID: {message_id}, Data: {message_data}")

                # Acknowledge that this message has been processed
                r.xack(STREAM_NAME, GROUP_NAME, message_id)

        return {"messages": output if output else "No messages found"}

    except Exception as e:
        return {"error": str(e)}

@router.post("/video/convert")
def convert_video(target_format: str = Form(), file: UploadFile = File(), db=Depends(get_db)):
    upload_dir = Path("/usr/src/app/media")
    upload_dir.mkdir(parents=True, exist_ok=True)

    original_name = Path(file.filename).stem
    ext = Path(file.filename).suffix.lower()
    random_suffix = uuid.uuid4().hex[:8]
    
    stored_file_name = f"{original_name}-{random_suffix}{ext}"
    original_path = upload_dir / stored_file_name

    with original_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    converted_file_name = f"{original_name}-{random_suffix}-converted.mp3"
    converted_file_path = upload_dir / converted_file_name
    
    # def convert_to_mp3(input_path, output_path):
    #     cmd = [
    #         "ffmpeg",
    #         "-i", input_path,
    #         "-vn",
    #         "-acodec", "libmp3lame",
    #         "-b:a", "192k",
    #         output_path
    #     ]

    #     subprocess.run(cmd, check=True)

    # convert_to_mp3(file_path, converted_file_path)

    # print(result.stdout)  # ffmpeg logs usually go to stderr though
    # print(result.stderr)

    from_format='mp4',
    to_format='mp3',

    create_conversion_record = videoConversionService.create_conversion(db, from_format=from_format, to_format=to_format, original_path=stored_file_name)

    convert_ob = ConversionObject(conversion_id=create_conversion_record.id, original_path=stored_file_name, final_path=converted_file_name, created_at=create_conversion_record.created_at)
    entry_id = videoConversionService.queue_conversion_job(r, STREAM_NAME, convert_ob)

    
    return {
        "target_format": target_format,
        "file_name": stored_file_name,
        "saved_to": str(original_path.resolve()),
    }
    

@router.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

app = FastAPI()
app.include_router(router)
