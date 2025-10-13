import axios from "axios";

// Local province data (imported statically)
import * as Bagmati from "../provience/Bagmati";
import * as Gandaki from "../provience/Gandaki";
import * as Koshi from "../provience/Koshi";
import * as Lumbini from "../provience/Lumbini";
import * as Madhesh from "../provience/Madhesh";
import * as Sudurpashchim from "../provience/Sudurpashchim";
import * as Karnali from "../provience/Karnali";

// 🔹 Local Province data
export const provinces = [
  { name: "Bagmati", data: Bagmati.default },
  { name: "Gandaki", data: Gandaki.default },
  { name: "Koshi", data: Koshi.default },
  { name: "Lumbini", data: Lumbini.default },
  { name: "Madhesh", data: Madhesh.default },
  { name: "Sudurpashchim", data: Sudurpashchim.default },
  { name: "Karnali", data: Karnali.default },
];

// 🔹 Axios setup for backend communication
const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // change this if needed
});

// 🔹 Feedback & Grievance Endpoints
export const sendFeedback = async (feedbackData) => {
  try {
    const response = await API.post("feedback/", feedbackData);
    return response.data;
  } catch (error) {
    console.error("Error sending feedback:", error.response?.data || error.message);
    throw error;
  }
};

export const sendGrievance = async (grievanceData) => {
  try {
    const response = await API.post("grievance/", grievanceData);
    return response.data;
  } catch (error) {
    console.error("Error sending grievance:", error.response?.data || error.message);
    throw error;
  }
};

// 🔹 Admin APIs
export const getFeedbacks = async () => {
  try {
    const response = await API.get("feedback/");
    return response.data;
  } catch (error) {
    console.error("Error fetching feedbacks:", error.response?.data || error.message);
    throw error;
  }
};

export const getGrievances = async () => {
  try {
    const response = await API.get("grievance/");
    return response.data;
  } catch (error) {
    console.error("Error fetching grievances:", error.response?.data || error.message);
    throw error;
  }
};

export const getDepartments = async () => {
  try {
    const response = await API.get("departments/");
    return response.data;
  } catch (error) {
    console.error("Error fetching departments:", error.response?.data || error.message);
    throw error;
  }
};

// 🔹 Helper to get local district & municipality data
export const getDistrictsByProvince = (provinceName) => {
  const province = provinces.find((p) => p.name.toLowerCase() === provinceName.toLowerCase());
  return province ? province.data.districts : [];
};

export const getMunicipalitiesByDistrict = (provinceName, districtName) => {
  const province = provinces.find((p) => p.name.toLowerCase() === provinceName.toLowerCase());
  if (!province) return [];
  const district = province.data.districts.find(
    (d) => d.name.toLowerCase() === districtName.toLowerCase()
  );
  return district ? district.municipalities : [];
};
