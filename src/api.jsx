// Feedback/api.jsx
import axios from "axios";

// --- Adjust this BASE_URL depending on platform / emulator / device ---
export const BASE_URL = "http://10.0.2.2:8000/api"; // Android emulator
// export const BASE_URL = "http://localhost:8000/api"; // iOS simulator / dev machine
// export const BASE_URL = "http://192.168.x.y:8000/api"; // physical device (replace IP)

// -------- Local static departments (DEFAULT EXPORT) --------
const departments = [
  { id: 1, name: "Agriculture" },
  { id: 2, name: "Education" },
  { id: 3, name: "Health" },
  { id: 4, name: "Infrastructure" },
  { id: 5, name: "Tourism" },
  { id: 6, name: "Finance" },
  { id: 7, name: "Environment" },
  { id: 8, name: "Transport" },
];

// -------- Province data imports (DEFAULT imports; provinces export default) --------
// IMPORTANT: these paths assume api.jsx sits at Feedback/ and provinces are at Feedback/provience/
import Bagmati from "../provience/Bagmati";
import Gandaki from "../provience/Gandaki";
import Koshi from "../provience/Koshi";
import Lumbini from "../provience/Lumbini";
import Madhesh from "../provience/Madhesh";
import Sudurpashchim from "../provience/Sudurpashchim";
import Karnali from "../provience/Karnali";

// Normalize province lookup
const provinceDataMap = {
  bagmati: Bagmati,
  gandaki: Gandaki,
  koshi: Koshi,
  lumbini: Lumbini,
  madhesh: Madhesh,
  sudurpashchim: Sudurpashchim,
  karnali: Karnali,
};

// -------- Axios instance --------
const api = axios.create({
  baseURL: BASE_URL.endsWith("/") ? BASE_URL : BASE_URL + "/",
  timeout: 20000,
});

// If you need auth header to be attached automatically, add interceptor here
// api.interceptors.request.use(async (cfg) => {
//   const token = await AsyncStorage.getItem('authToken');
//   if (token) cfg.headers.Authorization = `Token ${token}`;
//   return cfg;
// });

// -------- Backend API helpers (named exports) --------
export const sendFeedback = async (payload, token) => {
  try {
    const res = await api.post("feedbacks/", payload, {
      headers: token ? { Authorization: `Token ${token}` } : undefined,
    });
    return res.data;
  } catch (err) {
    // bubble useful message
    throw err.response?.data || err;
  }
};

export const sendGrievance = async (payload, token) => {
  try {
    const res = await api.post("grievances/", payload, {
      headers: token ? { Authorization: `Token ${token}` } : undefined,
      // If uploading files, set content-type to multipart/form-data from caller
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const listFeedbacks = async (token) => {
  const res = await api.get("feedbacks/", {
    headers: token ? { Authorization: `Token ${token}` } : undefined,
  });
  return res.data;
};

export const listGrievances = async (token) => {
  const res = await api.get("grievances/", {
    headers: token ? { Authorization: `Token ${token}` } : undefined,
  });
  return res.data;
};

export const adminRespondFeedback = async (id, responseText, token) => {
  const res = await api.post(`feedbacks/${id}/respond/`, { response: responseText }, {
    headers: token ? { Authorization: `Token ${token}` } : undefined,
  });
  return res.data;
};

export const adminRespondGrievance = async (id, responseText, token) => {
  const res = await api.post(`grievances/${id}/respond/`, { response: responseText }, {
    headers: token ? { Authorization: `Token ${token}` } : undefined,
  });
  return res.data;
};

// -------- Local data helpers --------
export const getDistrictsByProvince = (provinceName = "") => {
  if (!provinceName) return [];
  const key = provinceName.toLowerCase();
  const data = provinceDataMap[key];
  // Some province files export object { name: 'Bagmati', districts: [...] } OR array; handle both:
  if (!data) return [];
  if (Array.isArray(data)) {
    // if the file exported an array of districts directly
    return data;
  }
  // expected shape: { name: 'Bagmati', districts: [ { name: 'X', municipalities: [...] } ] }
  return data.districts || [];
};

export const getMunicipalitiesByDistrict = (provinceName = "", districtName = "") => {
  const districts = getDistrictsByProvince(provinceName);
  if (!districts || districts.length === 0) return [];
  // districts might be an array of objects or an array of something else; try to normalize
  const found = districts.find((d) => {
    if (!d) return false;
    const n = d.name || d.district || d.title || "";
    return n.toString().toLowerCase() === (districtName || "").toString().toLowerCase();
  });
  return (found && (found.municipalities || found.munis || found.items)) || [];
};

// -------- Default export (departments array) --------
export default departments;
