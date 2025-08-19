import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import Logo from "../assets/logo";
import { extractBearerToken } from "../auth/Auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fullLoading, setFullloading] = useState(true);
  const [likes, setLikes] = useState([]);
  const authToken = localStorage.getItem("token");
  const [CurrentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState("");

  const fetchUser = async () => {
    if (!authToken) return;

    try {
      setFullloading(true);
      const res = await axiosInstance.get(`/api/user/`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setCurrentUser(res.data);
      setIsLoggedIn(true);
    } catch (error) {
      localStorage.removeItem("token");
      setError(error);
      setIsLoggedIn(false);
    } finally {
      setFullloading(false);
    }
  };

  // This runs on initial load
  useEffect(() => {
    fetchUser();
  }, []);

  // login handler
  const login = async (token) => {
    localStorage.setItem("token", extractBearerToken(token));
    await fetchUser();
  };

  // logout handler
  const logout = async () => {
    try {
      await axiosInstance.get("/logout");
      setCurrentUser(null);
    } catch {}
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        authToken,
        setFullloading,
        fullLoading,
        likes,
        setLikes,
        fetchUser,
        CurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
