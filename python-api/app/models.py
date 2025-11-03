from database import Base
from sqlalchemy import Column, Integer, String, TIMESTAMP, Boolean, text, Uuid


class Conversion(Base):
    __tablename__ = "conversions"
    
    id = Column(Uuid, primary_key=True, nullable=False)
    from_format = Column(String, nullable=False)
    to_format = Column(String, nullable=False)
    original_path = Column(String, nullable=True)
    final_path = Column(String, nullable=True)
    status = Column(String, nullable=False, default="PENDING")
    created_at=Column(TIMESTAMP(timezone=True), server_default=text('now()'))
    converted_at=Column(TIMESTAMP(timezone=True), nullable=True)