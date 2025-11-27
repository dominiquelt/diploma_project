from sqlalchemy import Column, Integer, String, ForeignKey,Float
from app.database import Base
from sqlalchemy.orm import relationship

class Favorite(Base):
    __tablename__ = "favorites"

    id = Column(Integer, primary_key=True, index=True)
    user_id=Column(Integer, ForeignKey("users.id"))
    track_name=Column(String)
    artist=Column(String)
    similarity=Column(Float)

    user = relationship("User", back_populates="favorites")