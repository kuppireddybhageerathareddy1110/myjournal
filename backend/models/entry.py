from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class Entry(BaseModel):
    title: str
    content: str
    mood: Optional[str] = "unknown"
    tags: List[str] = Field(default_factory=list)
    created_at: Optional[datetime] = None
    date: Optional[datetime] = None

class UpdateEntry(BaseModel):
    title: str | None = None
    content: str | None = None
    mood: str | None = None
    tags: List[str] | None = None
