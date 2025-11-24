import { useState, useEffect } from "react";
import SliderInput from "../components/SlidersInput";

type Props = {
  onNext: (data: any) => void;
};

export default function SlidersScreen({ onNext }: Props) {
  const [energy, setEnergy] = useState(0.5);
  const [danceability, setDanceability] = useState(0.5);
  const [valence, setValence] = useState(0.5);
  const [tempo, setTempo] = useState(120);

  // 🧹 reset suwaków po każdym ponownym wejściu na ekran
  useEffect(() => {
    setEnergy(0.5);
    setDanceability(0.5);
    setValence(0.5);
    setTempo(120);
  }, []);

  const handleRecommend = async () => {

    console.log("🧭 Wysyłam do backendu:", {
      energy,
      danceability,
      valence,
      tempo,
    });

    const response = await fetch("http://127.0.0.1:8000/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        energy,
        danceability,
        valence,
        tempo,
      }),
    });

    const data = await response.json();
    console.log("🎵 Rekomendacja:", data);
    onNext(data);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-bgLight text-textMain px-8">
      <p className="text-5xl mb-6 font-semibold">Call the tune</p>
      <p className="text-lg mb-10 text-center max-w-md">
        Use the sliders to find a song that matches your mood
      </p>

      <div className="w-full max-w-md">
        <SliderInput label="Energy" min={0} max={1} step={0.01} value={energy} onChange={setEnergy} />
        <SliderInput label="Danceability" min={0} max={1} step={0.01} value={danceability} onChange={setDanceability} />
        <SliderInput label="Valence" min={0} max={1} step={0.01} value={valence} onChange={setValence} />
        <SliderInput label="Tempo (BPM)" min={60} max={200} step={1} value={tempo} onChange={setTempo} />
      </div>

      <button
        onClick={handleRecommend}
        className="mt-10 bg-gradient-to-r from-coralStart to-coralEnd text-white px-10 py-3 rounded-full shadow-md font-medium tracking-wide hover:scale-105 transition-transform duration-300"
      >
        recommend.
      </button>
    </div>
  );
}
