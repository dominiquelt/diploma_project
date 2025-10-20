from recommender import Recommender
import pandas as pd

reco = Recommender(csv_path="../data/songs.csv")

# 1) kolumny
expected = {"track_name","artist","energy","danceability","valence","tempo"}
assert expected.issubset(set(reco.df.columns)), "Brakuje wymaganych kolumn"

# 2) brak NaN po czyszczeniu
num = ["energy","danceability","valence","tempo"]
assert reco.df[num].isna().sum().sum() == 0, "Są NaN w numeric_cols"

# 3) zakresy
for c in ["energy","danceability","valence"]:
    assert (reco.df[c].between(0,1)).all(), f"Wartości poza [0,1] w {c}"

assert (reco.df["tempo"] >= 30).all() and (reco.df["tempo"] <= 250).all(), "Tempo poza [30,250]"

print("✅ Wszystkie testy przeszły")
