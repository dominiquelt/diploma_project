import { useState } from "react";
import WelcomeScreen from "./screens/Welcome";
import SlidersScreen from "./screens/Sliders";
import ResultsScreen from "./screens/Results";

function App() {
  const [currentScreen, setCurrentScreen] = useState("welcome");
  const [recommendation, setRecommendation] = useState<{
    track_name: string;
    artist: string;
    similarity: number;
  } | null>(null);
  const [resetCounter, setResetCounter] = useState(0);

  const handleRecommendation = (data: any) => {
    setRecommendation(data);
    setCurrentScreen("results");
  };

  const handleTryAgain = () => {
    setRecommendation(null);   
    setResetCounter(prev => prev + 1); // 👈 zwiększa licznik przy każdym "try again"
    setCurrentScreen("sliders");
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
          onRestart={() => {
            setRecommendation(null);
            setCurrentScreen("sliders");
          }}
        />
      )}

    </>
  );
}

export default App;
