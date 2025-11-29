const API_URL = "http://127.0.0.1:8000/auth";

export async function login(email: string, password: string) {
  const formData = new URLSearchParams();
  formData.append("username", email);
  formData.append("password", password);

  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  return await response.json(); // { access_token, token_type }
}

export async function register(email: string, username: string, password: string) {
  const response = await fetch(
    `${API_URL}/register?email=${email}&username=${username}&password=${password}`,
    { method: "POST" }
  );

  if (!response.ok) throw new Error("Registration failed");
  return await response.json();
}


