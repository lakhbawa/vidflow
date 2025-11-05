from uuid import UUID

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

def get_conversion_status(db: Session, conversion_id: str):
    try:
        uuid_id = UUID(conversion_id)
    except ValueError:
        return None  # invalid UUID format

    conv = db.query(Conversion).filter(Conversion.id == uuid_id).first()

    if not conv:
        return None

    return {
        "id": str(conv.id),
        "status": conv.status,
        "from_format": conv.from_format,
        "to_format": conv.to_format,
        "original_path": conv.original_path,
        "final_path": conv.final_path,
        "converted_at": conv.converted_at.isoformat() if conv.converted_at else None,
        "created_at": conv.created_at.isoformat() if conv.created_at else None,
    }