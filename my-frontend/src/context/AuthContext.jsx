import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  /* =========================================================
     AUTH TOKEN
     ========================================================= */

  const [token, setToken] = useState(() =>
    localStorage.getItem("token")
  );

  /* =========================================================
     SYNC AUTH STATE ACROSS TABS
     ========================================================= */

  useEffect(() => {
    const sync = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener("storage", sync);
    };
  }, []);

  /* =========================================================
     LOGIN
     ========================================================= */

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  /* =========================================================
     LOGOUT
     ========================================================= */

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  /* =========================================================
     CONTEXT
     ========================================================= */

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* =========================================================
   SAFE AUTH HOOK
   ========================================================= */

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};