import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_KEY = "enoch-admin-session";
const PASSWORD_KEY = "enoch-admin-password";
const DEFAULT_ADMIN_EMAIL = "admin@ephfirm.com";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(SESSION_KEY);
      if (saved) {
        const session = JSON.parse(saved) as { token: string; email: string; name: string };
        setToken(session.token);
        setUser({
          id: "local-admin-user",
          email: session.email,
          name: session.name,
          role: "admin",
        });
      }
    } catch (error) {
      console.error("Failed to restore local admin session:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    if (normalizedEmail !== DEFAULT_ADMIN_EMAIL) {
      throw new Error("Invalid email");
    }

    const existingPassword = window.localStorage.getItem(PASSWORD_KEY);

    // First login initializes local password.
    if (!existingPassword) {
      if (password.trim().length < 6) {
        throw new Error("Password must be at least 6 characters");
      }
      window.localStorage.setItem(PASSWORD_KEY, password);
    } else if (existingPassword !== password) {
      throw new Error("Invalid password");
    }

    const newToken = `local-admin-${Date.now()}`;
    const newUser: User = {
      id: "local-admin-user",
      email: normalizedEmail,
      name: "Admin",
      role: "admin",
    };

    setToken(newToken);
    setUser(newUser);
    window.localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ token: newToken, email: newUser.email, name: newUser.name }),
    );
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    window.localStorage.removeItem(SESSION_KEY);
  };

  return <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
