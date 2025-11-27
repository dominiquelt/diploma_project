from app.database import Base, engine
from app.auth.models import User
from app.favorites.models import Favorite 

Base.metadata.create_all(bind=engine)