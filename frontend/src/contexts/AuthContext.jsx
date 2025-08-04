import { getMe, login, logout, register } from "@/services/auth";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const { data } = await getMe();
        setUser(data);
      } catch (err) {
        console.log("Error fetching user data:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const loginUser = async (userData) => {
    const { data } = await login(userData);
    setUser(data.user);
  };

  const registerUser = async (userData) => {
    const { data } = await register(userData);
    setUser(data.user);
  };

  const logoutUser = async () => {
    await logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login: loginUser,
    logout: logoutUser,
    register: registerUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
