from routes.mood import detect_mood  # ADD THIS
from fastapi import APIRouter, Depends, Header, HTTPException
from utils.jwt_handler import verify_token  
@router.post("/")
async def create_entry(entry: Entry, user=Depends(current_user)):

    ai_mood = await detect_mood({"text": entry.content})
    mood = ai_mood.get("mood", "unknown")

    entry_dict = entry.model_dump()

    # Auto-fill missing fields
    entry_dict["created_at"] = entry_dict.get("created_at") or datetime.utcnow()
    entry_dict["date"] = entry_dict.get("date") or datetime.utcnow()
    entry_dict["mood"] = mood
    entry_dict["user_id"] = user["id"]

    result = await entries_collection.insert_one(entry_dict)

    return {"id": str(result.inserted_id), "mood": mood}
