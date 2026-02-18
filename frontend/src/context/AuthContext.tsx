import { createContext, useContext, useState } from "react";
import type {ReactNode} from "react";

interface AuthContextType {
  isAuth: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({children}: {children: ReactNode}) {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  return (
    <AuthContext.Provider value={{isAuth}}>
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
