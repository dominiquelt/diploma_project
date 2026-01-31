# 🎵 Music Recommendation Web Application

This repository contains the implementation of a **music recommendation web application** developed as part of an **engineering diploma project**.  
The application allows users to generate personalized music recommendations based on selected audio preferences such as energy, danceability, valence, and tempo.

The system is built using a **client–server architecture** and follows the principles of **RESTful API design**.

---

## 📌 Project Overview

The main goal of this project is to design and implement a web-based system that:
- collects user-defined music preferences,
- processes them using a recommendation algorithm based on **cosine similarity**,
- returns the most relevant music track,
- allows registered users to save and manage their favorite recommendations.

The application is divided into three main layers:
- **Frontend** – user interface and interaction,
- **Backend** – business logic, recommendation algorithm, and API,
- **Database & CSV data source** – persistent storage of users and static music data.

---

## 🧠 Recommendation Algorithm

The recommendation mechanism is based on:
- vector representation of music features,
- normalization of numerical values using **Min-Max scaling**,
- similarity comparison using **cosine similarity**.

User preferences are compared against a dataset of tracks stored in a CSV file, and the most similar track is returned as the recommendation.

---

## 🏗️ System Architecture

### Backend
- **Language:** Python  
- **Framework:** FastAPI  
- **API Style:** RESTful  
- **Authentication:** JWT (JSON Web Tokens)  
- **ORM:** SQLAlchemy  
- **Database:** SQLite  
- **Data processing:** NumPy, Pandas, scikit-learn  

Backend responsibilities:
- user registration and authentication,
- processing recommendation requests,
- managing favorite tracks,
- validating and securing API access.

---

### Frontend
- **Language:** TypeScript  
- **Library:** React  
- **Architecture:** Single Page Application (SPA)  
- **State management:** React Hooks (`useState`, `useEffect`)  

Frontend responsibilities:
- collecting user preferences via sliders,
- communicating with backend API,
- presenting recommendations,
- managing authentication state and user navigation.

---

### Data Storage
- **Relational database:** stores users and favorite tracks,
- **CSV file:** stores static music dataset with audio features.

---

## 🚀 How to Run the Project

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload
```
### Frontend
```bash
cd frontend
npm install
npm run dev
```

Author: Dominika Liwia Tułacz
