import bcrypt

import bcrypt

# 🔹 Funkcja do hashowania hasła przed zapisaniem w bazie
def hash_password(password: str) -> str:
    # zamieniamy string na bajty i generujemy sól
    salt = bcrypt.gensalt()
    # tworzymy hash i zwracamy jako string (decode usuwa b'...')
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

# 🔹 Funkcja do sprawdzania, czy hasło podane przez użytkownika
#    pasuje do tego, które jest zapisane w bazie
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))
