# routes/mood.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

class MoodInput(BaseModel):
    text: str

# ✅ This is the real AI logic (REUSABLE)
async def analyze_mood(text: str):
    prompt = f"""
    Analyze the following text and classify the emotional mood.
    Possible moods: happy, sad, stressed, anxious, angry, neutral.
    Respond with ONLY one mood word.

    Text: {text}
    """

    model = genai.GenerativeModel("models/gemini-2.5-flash")
    response = model.generate_content(prompt)

    mood = response.text.strip().lower().replace(".", "")
    return mood

# Public API endpoint
@router.post("/mood-detect")
async def detect_mood(data: MoodInput):
    try:
        mood = await analyze_mood(data.text)
        return {"mood": mood}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
