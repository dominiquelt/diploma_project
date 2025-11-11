import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from dataclasses import dataclass
from sklearn.preprocessing import MinMaxScaler
from pathlib import Path
from dotenv import load_dotenv
import os

# Załaduj plik .env z katalogu backend/
load_dotenv(Path(__file__).resolve().parent.parent / ".env")

# Pobierz ścieżkę CSV z .env lub ustaw domyślną
csv_env = os.getenv("CSV_PATH", "data/songs.csv")

# Zbuduj pełną ścieżkę do pliku CSV
csv_path = Path(__file__).resolve().parent.parent / csv_env


class Recommender:
    def __init__(self, csv_path: str):
        self.csv_path=csv_path
        self.df = self.load_data()
        self.validate_columns()              
        self.coerce_and_fillna() 
        self.normalize_tempo()
        self.prepare_features()
    
    def load_data(self) -> pd.DataFrame:
        try:
            df = pd.read_csv(self.csv_path)
            return df
        except FileNotFoundError:
            raise FileNotFoundError(f"Could not find the file: {self.csv_path}")
        except Exception as e:
            raise RuntimeError(f"Error while reading the csv file: {e}")
        #print(reco.load_data())

    def validate_columns(self):
        required_columns = ["track_name", "artist", "energy", "danceability", "valence", "tempo"]
        csv_column_names = [c.strip().lower() for c in self.df.columns]

        file_cols = set(csv_column_names)
        req_cols = set(required_columns)

        missing = req_cols - file_cols
        extra = file_cols - req_cols

        if missing:
            raise ValueError(f"Missing required columns: {missing}")
        if extra:
            print(f"⚠️ Warning: Extra columns found (ignored): {extra}")
        else:
            print("✅ CSV matched successfully — all required columns are present.")

        #print(reco.validate_columns())

    def coerce_and_fillna(self):
        numeric_cols = ["energy", "danceability", "valence", "tempo"]

        #rzutowanie typów, by upewnić się, że dla kazdej kolumny wartosci nie są NaN
        for col in numeric_cols:
            self.df[col]=(
                self.df[col]
                .astype(str)
                .str.replace(",", ".", regex=False)
                .str.strip()
                .replace({"": None})
            )

        nan_before = {} #Słownik, by odnaleźć wartości, które nie są typami int/float
        for col in numeric_cols:
            nan_before[col] = self.df[col].isna().sum() # w danej kolumnie dodajemy do slownika sume odnaleznionych NaN w celu zaraportowania
            self.df[col] = pd.to_numeric(self.df[col], errors="coerce") # w dataframe zmieniamy znaki przekorwentowane na string na wartosci numeryczne float/int, w przypadku brakow errors, wartosc zmieniana jest na NaN

        #sprawdzenie czy po rzutowaniu typow cos sie zmienilo w ilosci NaN, czy pozostaly zgodne z wartosciami znalezionymi w slowniku nan_before

        for col in numeric_cols:
            nan_after_cast = self.df[col].isna().sum() #ponownie sprawdzami ilosc NaN dla kolumny
            if nan_after_cast > nan_before[col]:
                print(f"{col}: po rzutowaniu przybyło NaN: {nan_before[col]} -> {nan_after_cast}") #jesli pojawilo sie wiecej Nan wyswitlamy komunikat
        
        for col in numeric_cols:
            mean_val = self.df[col].mean(skipna=True) #obliczamy srednia dla danej kolumny, pomijajac wartosci na
            self.df[col] = self.df[col].fillna(mean_val) #przy uzyciu metody .fillna zmianiamy wartosci na powyzej obliczona srednia

        for col in ["energy", "danceability", "valence"]:
            # znajdź wszystkie wiersze, gdzie wartość przekracza 1.0
            mask = self.df[col] > 1.0  

            # sprawdź, czy w kolumnie w ogóle występują takie przypadki
            if mask.any():
                count = mask.sum()
                print(f"ℹ️ {col}: przeskalowano {count} wartości >1 do zakresu 0–1")
                
                # tylko te wartości >1 dzielimy przez 100
                self.df.loc[mask, col] = self.df.loc[mask, col] / 100.0

        #.clip() to bezpiecznik, który przycina wartości,
        #żeby cechy, które mają mieć zakres 0–1 lub realistyczne granice (np. tempo),
        #nie wychodziły poza ten zakres przez błędy lub anomalia w danych.

        for col in ["energy", "danceability", "valence"]:
            self.df[col] = self.df[col].clip(0, 1)
            #tempo zostawiamy dodatnie; normalizacja do 0–1 będzie w osobnej metodzie

        self.df["tempo"] = self.df["tempo"].clip(lower=30, upper=250)


        #print(self.df[numeric_cols].dtypes)  # powinny być float64/float32

    def normalize_tempo(self):
        scaler = MinMaxScaler()
        self.df["tempo_normalized"] = scaler.fit_transform(self.df[["tempo"]])

    def prepare_features(self):
        useful_features = self.df[["energy", "danceability", "valence", "tempo_normalized"]]
        self.features_matrix = useful_features.to_numpy()
        print("🔹 Feature matrix shape:", self.features_matrix.shape)

    def make_user_vector(self,user_data):
        keys = ["energy", "danceability", "valence", "tempo"]
        user_list=[]
        for key in keys:
            user_list.append(user_data[key])
        user_vector = np.array([user_list], dtype=float)
        return user_vector

    def recommend(self, user_data):
        user_input = self.make_user_vector(user_data)
        similarity = cosine_similarity(user_input, self.features_matrix)
        closest_index = np.argmax(similarity)
        best_similarity = similarity[0][closest_index]
        
        first_output = self.df.iloc[closest_index]
        song_data = first_output.to_dict()
        
        result = {
            "track_name": song_data["track_name"],
            "artist": song_data["artist"],
            "similarity": round(float(best_similarity), 3)
        }
        return result


reco = Recommender(csv_path=csv_path)

print(reco.features_matrix[:5])



print(reco.recommend({
    "energy": 0.32,
    "danceability": 0.4,
    "valence": 0.8,
    "tempo": 0.1
}))




#metoda recommend wykorzystujaca cosine_similarity

#test na danych







