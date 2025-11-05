from datetime import datetime
from pydantic import BaseModel
from uuid import UUID
class ConversionObject(BaseModel):
    conversion_id: UUID
    original_path: str
    final_path: str
    created_at: datetime
