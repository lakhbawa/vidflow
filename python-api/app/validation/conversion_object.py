from datetime import datetime
from uuid import UUID

from pydantic import BaseModel


class ConversionObject(BaseModel):
    conversion_id: UUID
    original_path: str
    final_path: str
    created_at: datetime
