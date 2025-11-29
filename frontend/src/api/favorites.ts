const API_URL = "http://127.0.0.1:8000";

export async function addFavorite(
  track_name: string,
  artist: string,
  similarity: number,
  token: string
) {
  const res = await fetch(
    `${API_URL}/favorites/add?track_name=${track_name}&artist=${artist}&similarity=${similarity}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to add favorite");
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
