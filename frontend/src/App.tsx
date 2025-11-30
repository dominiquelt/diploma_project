import { useState } from "react";
import WelcomeScreen from "./screens/Welcome";
import SlidersScreen from "./screens/Sliders";
import ResultsScreen from "./screens/Results";
import FavoritesScreen from "./screens/Favorites";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/Register";
import { AuthProvider, useAuth } from "./context/AuthContext";

function MainApp() {
  const { token } = useAuth();
  console.log("🧩 token:", token);

  // 🔹 Ustal ekran startowy (jeśli użytkownik ma token — zaczynamy od welcome)
  const [currentScreen, setCurrentScreen] = useState(token ? "welcome" : "login");
  const [recommendation, setRecommendation] = useState<{
    track_name: string;
    artist: string;
    similarity: number;
  } | null>(null);

  const handleRecommendation = (data: any) => {
    setRecommendation(data);
    setCurrentScreen("results");
  };

  // 🔹 Ekrany logowania / rejestracji
  if (!token) {
    if (currentScreen === "register") {
      return <RegisterScreen onSuccess={() => setCurrentScreen("login")} />;
    }

    return (
      <LoginScreen
        onSuccess={() => setCurrentScreen("welcome")}
        onRegister={() => setCurrentScreen("register")}
      />
    );
  }

  // 🔹 Po zalogowaniu — flow aplikacji
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
          onShowFavorites={() => setCurrentScreen("favorites")}
        />
      )}

      {currentScreen === "favorites" && (
        <FavoritesScreen onBack={() => setCurrentScreen("welcome")} />
      )}
    </>
  );
}

// 🔹 Główny komponent — otacza aplikację kontekstem autoryzacji (trzyma token)
export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
