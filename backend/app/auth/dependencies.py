from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from app.auth.jwt_handler import verify_token

# 1️⃣ Punkt odniesienia dla FastAPI — gdzie pobieramy token
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# 2️⃣ Funkcja do wyciągnięcia i weryfikacji użytkownika z tokena
def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = verify_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return payload  # np. {"user_id": 1, "email": "test@example.com"}
