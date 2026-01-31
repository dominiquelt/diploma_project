from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.database import SessionLocal
from app.favorites.models import Favorite
from app.auth.dependencies import get_current_user

router = APIRouter()

class FavoriteCreate(BaseModel):
    track_name: str
    artist: str
    similarity: float

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/add")
def add_favorite(
    favorite: FavoriteCreate,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user_id = current_user["user_id"]

    existing_favorite = (
        db.query(Favorite)
        .filter(
            Favorite.user_id == user_id,
            Favorite.track_name == favorite.track_name,
            Favorite.artist == favorite.artist
        )
        .first()
    )

    if existing_favorite:
        raise HTTPException(status_code=400, detail="Song already added to favorites")

    new_favorite = Favorite(
        user_id=user_id,
        track_name=favorite.track_name,
        artist=favorite.artist,
        similarity=favorite.similarity
    )

    db.add(new_favorite)
    db.commit()
    db.refresh(new_favorite)

    return {"message": "Song added to favorites successfully"}

@router.get("/list")
def list_favorites(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user_id = current_user["user_id"]

    favorites = (
        db.query(Favorite)
        .filter(Favorite.user_id == user_id)
        .all()
    )

    # zwróć pustą listę
    if not favorites:
        return []

    
    return [
        {
            "track_name": fav.track_name,
            "artist": fav.artist,
            "similarity": fav.similarity
        }
        for fav in favorites
    ]

@router.delete("/remove")
def remove_favorite(
    track_name: str,
    artist: str,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user_id = current_user["user_id"]

    favorite = (
        db.query(Favorite)
        .filter(
            Favorite.user_id == user_id,
            Favorite.track_name == track_name,
            Favorite.artist == artist
        )
        .first()
    )

    if not favorite:
        raise HTTPException(status_code=404, detail="Song not found in favorites")

    db.delete(favorite)
    db.commit()

    return {"message": "Song removed from favorites successfully"}
