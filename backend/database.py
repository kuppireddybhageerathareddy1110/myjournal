from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

client = AsyncIOMotorClient(MONGO_URI)

db = client["aesthetica"]
users_collection = db["users"]
entries_collection = db["entries"]
board_collection = db["moodboard"]
