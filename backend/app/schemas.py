from pydantic import BaseModel, Field
from typing import List


#user preferences based on the sliders

class Prefs(BaseModel):
    energy: float = Field(ge=0, le=1)
    danceability: float = Field(ge=0, le=1)
    valence: float = Field(ge=0, le=1)
    tempo: float = Field(ge=60, le=200)

# frontend request

class RecommendRequest(BaseModel):
    prefs: Prefs
    top_k: int = 1

# one song answer

class TrackOut(BaseModel):
    track_name: str
    artist: str
    score: float
    why: List[str]


# last answer by the recommender

class RecommendResponse(BaseModel):
    results: List[TrackOut]


class UserInput(BaseModel):
    energy: float
    danceability: float
    valence: float
    tempo: float
