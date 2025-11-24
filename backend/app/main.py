from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.recommender import Recommender
from app.schemas import UserInput 
from pathlib import Path
from dotenv import load_dotenv
import os

# 1️⃣ Wczytaj plik .env z katalogu backend/
load_dotenv(Path(__file__).resolve().parent.parent / ".env")

# 2️⃣ Pobierz ścieżkę z .env (lub ustaw domyślną)
csv_env = os.getenv("CSV_PATH", "data/songs.csv")

# 3️⃣ Zbuduj pełną ścieżkę absolutną do CSV
csv_path = Path(__file__).resolve().parent.parent / csv_env

# 4️⃣ Inicjalizuj model rekomendacji
reco = Recommender(csv_path=csv_path)

# 5️⃣ Utwórz aplikację FastAPI
app = FastAPI(title="Music Recommender App")

# 6️⃣ Middleware dla CORS (frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 👈 można ograniczyć np. do ["http://localhost:5174"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 7️⃣ Endpointy
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

