from pathlib import Path
import shutil
from typing import Union
import uuid
import redis

from fastapi import FastAPI, APIRouter, Form, File, UploadFile

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

@router.get("/redis-producer-test")
def redis_test():
    entry_id = r.xadd(STREAM_NAME, {'conversion_id': 1, 'file_path': '__file__'})
    print(f"Added entry with ID: {entry_id}")
    return {
        "entry_id": entry_id
    }
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