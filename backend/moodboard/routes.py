from fastapi import APIRouter, Depends, HTTPException, Header
from utils.jwt_handler import verify_token
from models.board_item import BoardItem
from database import board_collection
from bson import ObjectId

router = APIRouter()

def current_user(auth: str = Header(None)):
    payload = verify_token(auth)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    return payload


@router.post("/")
async def create_item(item: BoardItem, user=Depends(current_user)):
    item_dict = item.model_dump()
    item_dict["user_id"] = user["id"]

    result = await board_collection.insert_one(item_dict)

    return {"id": str(result.inserted_id)}


@router.get("/")
async def get_items(user=Depends(current_user)):
    docs = board_collection.find({"user_id": user["id"]})

    items = []
    async for doc in docs:
        doc["_id"] = str(doc["_id"])     # convert ObjectId to string
        items.append(doc)

    return items


@router.put("/{item_id}")
async def update_item(item_id: str, item: BoardItem, user=Depends(current_user)):
    result = await board_collection.update_one(
        {"_id": ObjectId(item_id), "user_id": user["id"]},
        {"$set": item.model_dump()}
    )

    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Item not found")

    return {"message": "Updated"}


@router.delete("/{item_id}")
async def delete_item(item_id: str, user=Depends(current_user)):
    result = await board_collection.delete_one(
        {"_id": ObjectId(item_id), "user_id": user["id"]}
    )

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Item not found")

    return {"message": "Deleted"}
