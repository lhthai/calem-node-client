import { createContext, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useLocalStorage("itmsAuth", null);
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    setAuth(null);
    navigate("/signin", { replace: true, state: { from: location } });
  };

  const value = {
    auth,
    setAuth,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
