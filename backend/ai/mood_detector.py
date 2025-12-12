import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

router = APIRouter()

API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise ValueError("GEMINI_API_KEY is missing in .env file")

# Configure Gemini
genai.configure(api_key=API_KEY)

class MoodInput(BaseModel):
    text: str

@router.post("/mood-detect")
async def detect_mood(data: MoodInput):
    prompt = f"""
    Analyze the following text and classify the emotional mood.
    Possible moods: happy, sad, stressed, anxious, angry, neutral.
    Respond with ONLY one mood word. No explanation.

    Text: {data.text}
    """

    try:
        # USE YOUR ACTUAL SUPPORTED MODEL
        model = genai.GenerativeModel("models/gemini-2.5-flash")

        response = model.generate_content(prompt)

        mood = response.text.strip().lower()
        mood = mood.replace(".", "").replace("\n", "")

        return {"mood": mood}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
