from routes.mood import detect_mood  # ADD THIS

@router.post("/")
async def create_entry(entry: Entry, user=Depends(current_user)):
    # AUTO-DETECT MOOD USING Gemini API
    ai_mood = await detect_mood({"text": entry.content})
    mood = ai_mood["mood"]

    entry_dict = entry.model_dump()
    entry_dict["user_id"] = user["id"]
    entry_dict["mood"] = mood  # STORE THE AI MOOD

    result = await entries_collection.insert_one(entry_dict)

    return {"id": str(result.inserted_id)}
from fastapi import APIRouter, Depends, Header, HTTPException
from utils.jwt_handler import verify_token  