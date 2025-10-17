import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem("access");
      setUserToken(token);
      setLoading(false);
    };
    loadToken();
  }, []);

  const login = async (access, refresh) => {
    await AsyncStorage.setItem("access", access);
    await AsyncStorage.setItem("refresh", refresh);
    setUserToken(access);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("access");
    await AsyncStorage.removeItem("refresh");
    setUserToken(null);
  };

  return (
    <AuthContext.Provider value={{ userToken, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
