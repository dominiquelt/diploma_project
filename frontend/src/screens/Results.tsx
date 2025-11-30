import { useAuth } from "../context/AuthContext";
import { addFavorite } from "../api/favorites";

type Props = {
  track_name: string;
  artist: string;
  similarity: number;
  onRestart: () => void;
  onShowFavorites: () => void; // 👈 dodany nowy props
};

export default function ResultScreen({
  track_name,
  artist,
  similarity,
  onRestart,
  onShowFavorites, // 👈 dodany tutaj też
}: Props) {
  const { token } = useAuth();

  const handleAddFavorite = async () => {
    if (!token) {
      alert("Please log in first!");
      return;
    }

    try {
      await addFavorite(track_name, artist, similarity, token);
      alert("✅ Added to favorites!");
    } catch (err) {
      alert("❌ Could not add to favorites");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-bgLight text-textMain">
      <p className="text-4xl mb-10 font-bold text-center">
        Your very own recommendation is here!
      </p>

      <div className="bg-white rounded-2xl shadow-md p-8 mb-10 max-w-sm w-full text-center">
        <p className="text-3xl mb-2 font-bold text-coralStart">{track_name}</p>
        <p className="text-lg text-gray-700 mb-2">by {artist}</p>
        <p className="text-md text-gray-500">
          similarity: {similarity.toFixed(3)}
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleAddFavorite}
          className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-8 py-3 rounded-full shadow-md font-medium hover:scale-105 transition-transform duration-300"
        >
          💖 Add to Favorites
        </button>

        <button
          onClick={onRestart}
          className="bg-gray-200 text-gray-800 px-8 py-3 rounded-full shadow-md font-medium hover:scale-105 transition-transform duration-300"
        >
          Try again
        </button>

        <button
          onClick={onShowFavorites}
          className="bg-gray-100 text-gray-800 px-8 py-3 rounded-full shadow-md font-medium hover:scale-105 transition-transform duration-300"
        >
          ⭐ View Favorites
        </button>
      </div>
    </div>
  );
}
