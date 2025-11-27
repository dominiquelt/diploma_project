const API_URL = "http://127.0.0.1:8000";

export async function login(email: string, password: string) {
    const response= await fetch ("http://127.0.0.1:8000",{
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: new URLSearchParams({ username: email, password }),
    });

    if (!response.ok) {
        throw new Error("Invalid credentials");
    }
    return await response.json();
}

export async function register(email: string, username:string, password:string) {
    const response = await fetch (`${API_URL}/auth/register?email=${email}&username=${username}&password=${password}`,{
        method: "POST",
    });
    if (!response.ok) throw new Error("Registration failed");
    return await response.json();
}