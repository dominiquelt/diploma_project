import React, { createContext, useState, useContext, type ReactNode, useEffect } from "react";

type AuthContextType = {
  token: string | null;
  login: (t: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  // czy token jest w localStorage
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  //  zapisuje token w stanie i w localStorage
  const login = (t: string) => {
    setToken(t);
    localStorage.setItem("token", t);
  };

  //  usuwa token
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };


  useEffect(() => {
    const stored = localStorage.getItem("token");
    if (stored !== token) setToken(stored);
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
