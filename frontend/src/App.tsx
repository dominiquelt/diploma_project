import React, { useState } from "react";
import WelcomeScreen from "./screens/Welcome";
import SlidersScreen from "./screens/Sliders";
import ResultsScreen from "./screens/Results";
import LoginScreen from "./screens/LoginScreen";
import { AuthProvider, useAuth } from "./context/AuthContext";

function MainApp() {
  const { token } = useAuth();

  // 🔒 jeśli brak tokena — pokazujemy ekran logowania
  if (!token) {
    return <LoginScreen onSuccess={() => {}} />;
  }

  // 🎵 po zalogowaniu działa Twój obecny flow
  const [currentScreen, setCurrentScreen] = useState("welcome");
  const [recommendation, setRecommendation] = useState<{
    track_name: string;
    artist: string;
    similarity: number;
  } | null>(null);

  const handleRecommendation = (data: any) => {
    setRecommendation(data);
    setCurrentScreen("results");
  };

  return (
    <>
      {currentScreen === "welcome" && (
        <WelcomeScreen onNext={() => setCurrentScreen("sliders")} />
      )}

      {currentScreen === "sliders" && (
        <SlidersScreen key={Date.now()} onNext={handleRecommendation} />
      )}

      {currentScreen === "results" && recommendation && (
        <ResultsScreen
          track_name={recommendation.track_name}
          artist={recommendation.artist}
          similarity={recommendation.similarity}
          onRestart={() => setCurrentScreen("sliders")}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
