from datetime import datetime
from pydantic import BaseModel
from uuid import UUID
class ConversionObject(BaseModel):
    conversion_id: UUID
    created_at: datetime
