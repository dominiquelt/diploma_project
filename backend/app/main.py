from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Music Recommender App")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status":"ok"}

@app.get("/features")
def features():
    return{
        "features": [
            {"key": "energy", "label": "Energy", "min": 0, "max": 1, "step": 0.01},
            {"key": "danceability", "label": "Danceability", "min": 0, "max": 1, "step": 0.01},
            {"key": "valence", "label": "Valence", "min": 0, "max": 1, "step": 0.01},
            {"key": "tempo", "label": "Tempo (BPM)", "min": 60, "max": 200, "step": 1},
        ]
    }