import { useState } from "react";
import { register } from "../api/auth";
import type { ReactNode } from "react";

export default function RegisterScreen({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const data = await register(email, username, password);
      alert("Registration successful!");
      onSuccess();
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-bgLight text-textMain">
      <h1 className="text-4xl mb-6 font-bold">Register</h1>

      <input
        className="border p-2 mb-4 rounded w-64"
        placeholder="enter your email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border p-2 mb-4 rounded w-64"
        placeholder="pick a username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className="border p-2 mb-4 rounded w-64"
        type="password"
        placeholder="time for shh... password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleRegister}
        className="bg-gradient-to-r from-coralStart to-coralEnd text-white px-8 py-2 rounded-full"
      >
        Create Account
      </button>
    </div>
  );
}
