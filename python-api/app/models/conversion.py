import uuid

from app.database import Base
from sqlalchemy import Column, String, TIMESTAMP, text
from sqlalchemy.dialects.postgresql import UUID


class Conversion(Base):
    __tablename__ = "conversions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, nullable=False)
    from_format = Column(String, nullable=False)
    to_format = Column(String, nullable=False)
    original_path = Column(String, nullable=True)
    final_path = Column(String, nullable=True)
    status = Column(String, nullable=False, server_default="PENDING")
    created_at = Column(TIMESTAMP(timezone=True), server_default=text("NOW()"))
    converted_at = Column(TIMESTAMP(timezone=True), nullable=True)
