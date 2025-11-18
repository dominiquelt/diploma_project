import { useState } from "react";
import WelcomeScreen from "./screens/Welcome";
import SlidersScreen from "./screens/Sliders";

function App() {
  const [currentScreen, setCurrentScreen] = useState("welcome");

  return (
    <>
      {currentScreen === "welcome" && (
        <WelcomeScreen onNext={() => setCurrentScreen("sliders")} />
      )}
      {currentScreen === "sliders" && <SlidersScreen onNext={() => setCurrentScreen("results")} />}
    </>
  );
}

export default App;
