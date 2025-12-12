from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from auth.routes import router as AuthRouter
from journal.routes import router as JournalRouter
from moodboard.routes import router as MoodboardRouter
from routes.mood import router as mood_router   # KEEP THIS

app = FastAPI(title="Aesthetica API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(AuthRouter, prefix="/auth", tags=["Auth"])
app.include_router(JournalRouter, prefix="/entries", tags=["Journal"])
app.include_router(MoodboardRouter, prefix="/board", tags=["Moodboard"])

# AI Mood Detection
app.include_router(mood_router, prefix="/mood", tags=["Mood Detection"])

@app.get("/")
def root():
    return {"message": "Aesthetica Backend Running"}
