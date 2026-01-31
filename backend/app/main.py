from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.recommender import Recommender
from app.schemas import UserInput
from app.auth.routes import router as auth_router  # ⬅️ DODANE
from pathlib import Path
from dotenv import load_dotenv
import os
from app.auth.dependencies import get_current_user
from fastapi import Depends
from app.favorites.routes import router as fav_router

#  plik .env z katalogu backend/
load_dotenv(Path(__file__).resolve().parent.parent / ".env")

#  ścieżkę z .env 
csv_env = os.getenv("CSV_PATH", "data/songs.csv")


csv_path = Path(__file__).resolve().parent.parent / csv_env

#  model rekomendacji
reco = Recommender(csv_path=csv_path)

#  FastAPI
app = FastAPI(title="Music Recommender App")

# middleware dla CORS (frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#  router dla autoryzacji
app.include_router(auth_router, prefix="/auth", tags=["Auth"])  # ⬅️ 

app.include_router(fav_router, prefix="/favorites",tags=["Favorites"])

# endpointy
@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/features")
def features():
    return {
        "features": [
            {"key": "energy", "label": "Energy", "min": 0, "max": 1, "step": 0.01},
            {"key": "danceability", "label": "Danceability", "min": 0, "max": 1, "step": 0.01},
            {"key": "valence", "label": "Valence", "min": 0, "max": 1, "step": 0.01},
            {"key": "tempo", "label": "Tempo (BPM)", "min": 60, "max": 200, "step": 1},
        ]
    }

@app.post("/recommend")
async def recommend(user_data: UserInput):
    result = reco.recommend(user_data.dict())
    return result

#testowy
@app.get("/protected")
def protected_route(current_user: dict = Depends(get_current_user)):
    return {"message": "You are authorized!", "user": current_user}