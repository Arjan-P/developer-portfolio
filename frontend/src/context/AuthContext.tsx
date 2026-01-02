import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthContextType {
  isAuth: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({children}: {children: ReactNode}) {
  const [token, setToken] = useState<string | null>(null);
  
  const login = (jwt: string) => {
    setToken(jwt);
    localStorage.setItem("token", jwt);
  };
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };
  const isAuth = !!token;
  return (
    <AuthContext.Provider value={{isAuth, token, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
