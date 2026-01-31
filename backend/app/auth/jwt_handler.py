from datetime import datetime, timedelta
from jose import JWTError, jwt
from dotenv import load_dotenv
import os
from pathlib import Path


load_dotenv(Path(__file__).resolve().parent.parent / ".env")

# klucz i algorytm do tokena
SECRET_KEY = os.getenv("SECRET_KEY", "supersekretnyklucz")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# Funkcja generująca token JWT
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Funkcja do weryfikacji tokena
def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None
