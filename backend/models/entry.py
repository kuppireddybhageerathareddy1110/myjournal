from pydantic import BaseModel, Field
from typing import List
from datetime import datetime

class Entry(BaseModel):
    title: str
    content: str
    mood: str = "unknown"
    tags: List[str] = Field(default_factory=list)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    date: datetime = Field(default_factory=datetime.utcnow)


class UpdateEntry(BaseModel):
    title: str | None = None
    content: str | None = None
    mood: str | None = None
    tags: List[str] | None = None
