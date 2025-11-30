const API_URL = "http://127.0.0.1:8000";

export async function addFavorite(
  track_name: string,
  artist: string,
  similarity: number,
  token: string
) {
  const res = await fetch(`${API_URL}/favorites/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ track_name, artist, similarity }),
  });

  if (!res.ok) {
    const errMsg = await res.text();
    throw new Error("Failed to add favorite: " + errMsg);
  }

  return await res.json();
}

export async function getFavorites(token: string) {
  const res = await fetch(`${API_URL}/favorites/list`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch favorites");
  }

  return await res.json();
}

export async function removeFavorite(track_name: string, artist: string, token: string) {
  const res = await fetch(
    `${API_URL}/favorites/remove?track_name=${encodeURIComponent(track_name)}&artist=${encodeURIComponent(artist)}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    const errMsg = await res.text();
    throw new Error("Failed to remove favorite: " + errMsg);
  }

  return await res.json();
}
