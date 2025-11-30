import { useState } from "react";
import { login } from "../api/auth";
import { useAuth } from "../context/AuthContext";

type LoginScreenProps = {
  onSuccess: () => void;
  onRegister: () => void;
};

export default function LoginScreen({ onSuccess, onRegister }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login: saveToken } = useAuth();

  const handleLogin = async () => {
    try {
      const data = await login(email, password);
      saveToken(data.access_token);
      onSuccess();
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-bgLight text-textMain">
      <h1 className="text-4xl mb-6 font-bold">Log in</h1>

      <input
        className="border p-2 mb-4 rounded w-64"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border p-2 mb-6 rounded w-64"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="bg-gradient-to-r from-coralStart to-coralEnd text-white px-8 py-2 rounded-full"
      >
        Log in
      </button>

      {/* 🔹 Link do rejestracji */}
      <p className="mt-4 text-sm text-gray-600">
        Don’t have an account?{" "}
        <span
          onClick={onRegister}
          className="text-coralStart font-semibold cursor-pointer hover:underline"
        >
          Register
        </span>
      </p>
    </div>
  );
}
