from pydantic import BaseModel, Field
from typing import Optional, Dict

class BoardItem(BaseModel):
    type: str   # "image" or "text"
    image_url: Optional[str] = None
    text: Optional[str] = None
    position: Dict[str, int] = Field(default_factory=lambda: {"x": 0, "y": 0})
