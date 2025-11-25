export async function fetchRecommendation(data: {
  energy: number;
  danceability: number;
  valence: number;
  tempo: number;
}) {
  const response = await fetch("http://127.0.0.1:8000/recommend", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch recommendation");
  }

  return await response.json();
}
