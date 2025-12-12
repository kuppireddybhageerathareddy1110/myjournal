from fastapi import APIRouter, HTTPException
from models.user import UserSignup, UserLogin, UserResponse
from database import users_collection
from utils.jwt_handler import create_token, verify_token
from passlib.context import CryptContext

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# SIGNUP
@router.post("/signup")
async def signup(user: UserSignup):
    existing = await users_collection.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    password = user.password[:72]   # truncate safely
    hashed_pass = pwd_context.hash(password)


    user_dict = {
        "name": user.name,
        "email": user.email,
        "password": hashed_pass
    }

    result = await users_collection.insert_one(user_dict)

    return {"message": "Signup successful", "id": str(result.inserted_id)}


# LOGIN
@router.post("/login")
async def login(data: UserLogin):
    user = await users_collection.find_one({"email": data.email})
    if not user:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    if not pwd_context.verify(data.password, user["password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_token({"id": str(user["_id"]), "email": user["email"]})

    return {"token": token, "name": user["name"]}
