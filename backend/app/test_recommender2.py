from recommender import Recommender

reco = Recommender(csv_path="../data/songs.csv")

user_vector = {
    "energy": 0.5,
    "danceability": 0.5,
    "valence": 0.5,
    "tempo": 100
}

result1 = reco.recommend(user_vector)
result2 = reco.recommend(user_vector)

assert result1["track_name"] == result2["track_name"], "Rekomendacje są niespójne"
assert result1["similarity"] == result2["similarity"], "Różne wartości podobieństwa"

print("✅ Test stabilności algorytmu zakończony pozytywnie")
