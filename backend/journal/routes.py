# journal/routes.py
from fastapi import APIRouter, HTTPException, Header, Depends
from database import entries_collection
from models.entry import Entry, UpdateEntry
from utils.jwt_handler import verify_token
from bson import ObjectId
from routes.mood import analyze_mood   # <-- ensure this is correct

router = APIRouter()


def current_user(auth: str = Header(None)):
    payload = verify_token(auth)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    return payload


@router.post("/")
async def create_entry(entry: Entry, user=Depends(current_user)):

    # 1. Detect mood using AI
    mood = await analyze_mood(entry.content)  # must return a string mood

    # 2. Prepare entry dict
    entry_dict = entry.dict()
    entry_dict["user_id"] = user["id"]
    entry_dict["mood"] = mood  # store mood in MongoDB

    # 3. Insert into DB
    result = await entries_collection.insert_one(entry_dict)

    return {"id": str(result.inserted_id), "mood": mood}


@router.get("/")
async def get_entries(user=Depends(current_user)):
    docs = entries_collection.find({"user_id": user["id"]})
    return [{**doc, "_id": str(doc["_id"])} async for doc in docs]


@router.get("/{entry_id}")
async def get_entry(entry_id: str, user=Depends(current_user)):
    try:
        obj_id = ObjectId(entry_id)
    except:
        raise HTTPException(status_code=400, detail="Invalid ID format")

    doc = await entries_collection.find_one({"_id": obj_id, "user_id": user["id"]})

    if not doc:
        raise HTTPException(status_code=404, detail="Entry not found")

    doc["_id"] = str(doc["_id"])
    return doc


@router.put("/{entry_id}")
async def update_entry(entry_id: str, update: UpdateEntry, user=Depends(current_user)):
    updated = {k: v for k, v in update.dict().items() if v is not None}

    result = await entries_collection.update_one(
        {"_id": ObjectId(entry_id), "user_id": user["id"]},
        {"$set": updated},
    )

    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Entry not found")

    return {"message": "Updated successfully"}


@router.delete("/{entry_id}")
async def delete_entry(entry_id: str, user=Depends(current_user)):
    result = await entries_collection.delete_one(
        {"_id": ObjectId(entry_id), "user_id": user["id"]}
    )

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Entry not found")

    return {"message": "Deleted successfully"}
