from app.validation.conversion_object import ConversionObject
import redis
from sqlalchemy.orm import Session
from sqlalchemy import insert
from app.models.conversion import Conversion

def queue_conversion_job(r: redis, stream_name: str, job: ConversionObject):
    r.xadd(stream_name, job.model_dump(mode="json"))



def create_conversion(
    db: Session,
    from_format: str,
    to_format: str,
    original_path: str
) -> Conversion:
    conv = Conversion(
        from_format=from_format,
        to_format=to_format,
        original_path=original_path,
        status="PENDING"
    )
    db.add(conv)
    db.commit()
    db.refresh(conv)
    return conv