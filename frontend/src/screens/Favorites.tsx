import { useEffect, useState } from "react";
import { getFavorites, removeFavorite } from "../api/favorites";
import { useAuth } from "../context/AuthContext";

type Favorite = {
  track_name: string;
  artist: string;
  similarity: number;
};

export default function FavoritesScreen({ onBack }: { onBack: () => void }) {
  const { token } = useAuth();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Pobranie ulubionych przy starcie
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!token) return;
      try {
        const data = await getFavorites(token);
        setFavorites(data);
      } catch (err) {
        alert("❌ Failed to load favorites");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [token]);

  // 🔹 Usuwanie ulubionej piosenki
  const handleRemove = async (track_name: string, artist: string) => {
    if (!token) return;
    const confirmDelete = confirm(`Remove "${track_name}" by ${artist} from favorites?`);
    if (!confirmDelete) return;

    try {
      await removeFavorite(track_name, artist, token);
      setFavorites(prev => prev.filter(f => f.track_name !== track_name || f.artist !== artist));
      alert("🗑️ Removed from favorites!");
    } catch (err) {
      alert("❌ Could not remove favorite");
      console.error(err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bgLight text-textMain p-6">
      <h1 className="text-4xl font-bold mb-8">⭐ Your Favorites</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-500">You have no favorites yet!</p>
      ) : (
        <ul className="space-y-4 w-full max-w-md">
          {favorites.map((fav, index) => (
            <li
              key={index}
              className="bg-white rounded-xl shadow p-4 text-center flex flex-col items-center"
            >
              <p className="text-2xl font-semibold text-coralStart">{fav.track_name}</p>
              <p className="text-gray-700">by {fav.artist}</p>
              <p className="text-gray-400 text-sm mb-2">
                similarity: {fav.similarity.toFixed(2)}
              </p>

              <button
                onClick={() => handleRemove(fav.track_name, fav.artist)}
                className="text-sm bg-red-500 text-white px-4 py-1 rounded-full hover:bg-red-600 transition"
              >
                🗑️ Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={onBack}
        className="mt-8 bg-gradient-to-r from-coralStart to-coralEnd text-white px-8 py-3 rounded-full shadow-md hover:scale-105 transition-transform duration-300"
      >
        🔙 Back
      </button>
    </div>
  );
}
