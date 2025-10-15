import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://127.0.0.1:8000/api"; // 

// Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// ✅ Automatically attach token for every request
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---------- AUTH ----------
export const login = async (username, password) => {
  const response = await api.post("/token/", { username, password });
  if (response.data.access) {
    await AsyncStorage.setItem("access", response.data.access);
    await AsyncStorage.setItem("refresh", response.data.refresh);
  }
  return response.data;
};

export const register = async (username, password, email) => {
  const response = await api.post("/register/", { username, password, email });
  return response.data;
};

export const logout = async () => {
  await AsyncStorage.removeItem("access");
  await AsyncStorage.removeItem("refresh");
};

// ---------- FEEDBACK ----------
export const sendFeedback = async (data) => {
  try {
    const response = await api.post("/feedback/", data);
    return response.data;
  } catch (error) {
    console.error("Error sending feedback:", error.response?.data || error);
    throw error;
  }
};

// ---------- GRIEVANCE ----------
export const sendGrievance = async (data) => {
  try {
    const response = await api.post("/grievance/", data);
    return response.data;
  } catch (error) {
    console.error("Error sending grievance:", error.response?.data || error);
    throw error;
  }
};
