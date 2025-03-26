import React, { createContext, useState, useEffect } from "react";
import { onLoginWithCredentials } from "./auth.service";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const onLogin = () => {
    const userData = {
      user_id: 2,
    };
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
    setLoading(false);
  };

  const onLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    setLoading(false);
  };
  const onLoginWithUsernameAndPassword = async (username, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await onLoginWithCredentials(username, password);
      if (!response.status) {
        throw new Error(response.message || "Invalid credentials");
      }

      localStorage.setItem("user", JSON.stringify(response));
      setUser(response);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        error,
        onLogin,
        onLogout,
        onLoginWithUsernameAndPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
