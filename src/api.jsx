// src/api.jsx
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * API helper for frontend <-> backend.
 *
 * Assumes Django DRF with JWT at:
 *   POST /api/token/           -> obtain (access, refresh)
 *   POST /api/token/refresh/   -> refresh
 *
 * And routers for:
 *   GET  /api/user-profile/
 *   POST /api/feedbacks/         (JSON)
 *   POST /api/grievances/        (multipart/form-data)
 *
 * Adjust BASE_URL if needed.
 */

const BASE_URL = "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json", // default for JSON endpoints
  },
});

// Attach access token on every request if present
api.interceptors.request.use(async (config) => {
  const access = await AsyncStorage.getItem("access");
  if (access) {
    config.headers.Authorization = `Bearer ${access}`;
  }
  return config;
});

// Helper to refresh access token using refresh token
const refreshAccessToken = async () => {
  try {
    const refresh = await AsyncStorage.getItem("refresh");
    if (!refresh) return null;
    const res = await axios.post(`${BASE_URL}/token/refresh/`, { refresh });
    const newAccess = res.data.access;
    if (newAccess) {
      await AsyncStorage.setItem("access", newAccess);
      return newAccess;
    }
    return null;
  } catch (err) {
    // if refresh failed, clear tokens
    await AsyncStorage.removeItem("access");
    await AsyncStorage.removeItem("refresh");
    return null;
  }
};

// Response interceptor: if 401 and refresh available, try refresh and replay the request
api.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest) return Promise.reject(error);

    const status = error.response?.status;

    // If token expired -> try refresh (only once)
    if (
      status === 401 &&
      !originalRequest._retry &&
      (await AsyncStorage.getItem("refresh"))
    ) {
      originalRequest._retry = true;
      const newAccess = await refreshAccessToken();
      if (newAccess) {
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);
// -------------------- USER SUBMISSIONS --------------------

export const getUserFeedbacks = async () => {
  const res = await api.get("/my-feedbacks/");
  return res.data;
};

export const getUserGrievances = async () => {
  const res = await api.get("/my-grievances/");
  return res.data;
};

// -------------------- AUTH --------------------

/**
 * Login - credentials: { username, password }
 * Expects JWT token response { access, refresh } from /token/
 */
export const loginUser = async (credentials) => {
  const res = await api.post("/token/", credentials);
  if (res.data?.access) {
    await AsyncStorage.setItem("access", res.data.access);
    await AsyncStorage.setItem("refresh", res.data.refresh);
  }
  return res.data;
};

/**
 * registerUser expects backend register route at /auth/register/
 * adjust payload keys to match your backend serializer
 */
export const registerUser = async (payload) => {
  const res = await api.post("/auth/register/", payload);
  return res.data;
};

export const logoutUser = async () => {
  await AsyncStorage.removeItem("access");
  await AsyncStorage.removeItem("refresh");
};

// -------------------- PROFILE --------------------
export const getUserProfile = async () => {
  const res = await api.get("/user-profile/");
  return res.data;
};

// -------------------- FEEDBACK --------------------
/**
 * sendFeedback - sends JSON payload expected by your FeedbackSerializer
 * data: {
 *   state, district, municipality, department, rating, comment
 * }
 */
export const sendFeedback = async (data) => {
  const payload = {
    state: data.state,
    district: data.district,
    municipality: data.municipality,
    department: data.department,
    rating: data.rating,
    comment: data.comment,
  };
  const res = await api.post("/feedbacks/", payload);
  return res.data;
};

// -------------------- GRIEVANCE --------------------
/**
 * sendGrievance - sends as multipart/form-data to support optional image uploads.
 * data: { state, district, municipality, department, title, comment, imageUri (optional) }
 *
 * Backend view has parser_classes = [MultiPartParser, FormParser],
 * so requests must be multipart/form-data.
 */
export const sendGrievance = async (data) => {
  const form = new FormData();

  form.append("state", data.state);
  form.append("district", data.district);
  form.append("municipality", data.municipality);
  form.append("department", data.department);
  form.append("title", data.title);
  // backend serializer expects 'comment' field name for grievance body
  form.append("comment", data.comment);

  // If an imageUri is provided and is a local file/uri, append it.
  // On web expo, imagePicker uri may be a blob or data URL; on mobile it's a file uri.
  if (data.imageUri) {
    // On React Native (iOS/Android) FormData file shape:
    // { uri, name, type }
    const uri = data.imageUri;
    // Guess filename/type
    const filename = uri.split("/").pop() || `photo_${Date.now()}.jpg`;
    let type = "image/jpeg";
    if (filename.match(/\.(png)$/i)) type = "image/png";
    form.append("image", { uri, name: filename, type });
  }

  // IMPORTANT: do not set axios default Content-Type header to application/json here.
  // Let axios/browser set the multipart boundary automatically by leaving Content-Type undefined.
  const res = await api.post("/grievances/", form, {
    headers: {
      "Content-Type": "multipart/form-data",
      // Authorization header is attached by interceptor
    },
  });

  return res.data;
};

export default api;
