// src/contexts/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";
import api from "api/axios";

type User = { id: number; name: string; email: string } | null;

interface AuthContextData {
  user: User;
  signOut: () => void;
  setUser: (u: User) => void;
}

export const AuthContext = createContext<AuthContextData>({
  user: null,
  signOut: () => {},
  setUser: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    // opcional: tentar obter perfil usando token salvo
    const tryLoad = async () => {
      const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
      if (!token) return;
      try {
        const resp = await api.get("/auth/me");
        setUser(resp.data.user);
      } catch {
        // se falhar, limpar tokens
        localStorage.removeItem("accessToken");
        sessionStorage.removeItem("accessToken");
      }
    };
    tryLoad();
  }, []);

  const signOut = () => {
    localStorage.removeItem("accessToken");
    sessionStorage.removeItem("accessToken");
    localStorage.removeItem("rememberMe");
    // opcional: chamar endpoint de logout para invalidar refresh token/cookie
    try {
      api.post("/auth/logout", {}, { withCredentials: true });
    } catch {}
    setUser(null);
    // redirecionar conforme app (ex: router)
  };

  return <AuthContext.Provider value={{ user, signOut, setUser }}>{children}</AuthContext.Provider>;
};
