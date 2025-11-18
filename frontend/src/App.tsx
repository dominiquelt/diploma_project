import { useState } from "react";
import WelcomeScreen from "./screens/Welcome";

function App() {
  const [currentScreen, setCurrentScreen] = useState("welcome");

  return (
    <>
      {currentScreen === "welcome" && (
        <WelcomeScreen onNext={() => setCurrentScreen("sliders")} />
      )}
      {currentScreen === "sliders" && <p>Sliders screen placeholder</p>}
    </>
  );
}

export default App;
