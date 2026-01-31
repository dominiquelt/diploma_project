from recommender import Recommender

reco = Recommender(csv_path="../data/songs.csv")

user_vector = {
    "energy": 0.8,
    "danceability": 0.7,
    "valence": 0.6,
    "tempo": 120
}

result = reco.recommend(user_vector)

# 1) Czy wynik istnieje
assert result is not None, "Brak rekomendacji"

# 2) Czy wynik zawiera wymagane pola
expected_keys = {"track_name", "artist", "similarity"}
assert expected_keys.issubset(result.keys()), "Niepoprawna struktura rekomendacji"

# 3) Czy podobieństwo jest w poprawnym zakresie
assert 0 <= result["similarity"] <= 1, "Niepoprawna wartość podobieństwa"

print("✅ Test rekomendacji zakończony pozytywnie")
