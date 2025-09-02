import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://127.0.0.1:8000/api/';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token');
        const response = await axios.post(`${BASE_URL}token/refresh/`, { refresh: refreshToken });
        const newAccessToken = response.data.access;
        await AsyncStorage.setItem('accessToken', newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}token/`, { username: email, password });
    const { access, refresh } = response.data;
    await AsyncStorage.setItem('accessToken', access);
    await AsyncStorage.setItem('refreshToken', refresh);
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || 'Login failed';
  }
};

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}register/`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Signup failed';
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
    return { success: true };
  } catch (error) {
    throw error;
  }
};

export const getStates = async () => {
  try {
    const response = await api.get('states/');
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Failed to fetch states';
  }
};

export const getMunicipalities = async (stateId) => {
  try {
    const url = stateId ? `municipalities/?state=${stateId}` : 'municipalities/';
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Failed to fetch municipalities';
  }
};

export const submitFeedback = async (municipalityId, departmentId, feedbackData) => {
  try {
    const response = await api.post(`municipalities/${municipalityId}/departments/${departmentId}/feedback/`, feedbackData);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Failed to submit feedback';
  }
};

export const submitGrievance = async (municipalityId, departmentId, grievanceData) => {
  try {
    const response = await api.post(`municipalities/${municipalityId}/departments/${departmentId}/grievance/`, grievanceData);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Failed to submit grievance';
  }
};

export const getGrievances = async () => {
  try {
    const response = await api.get('grievances/');
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Failed to fetch grievances';
  }
};

export const respondToGrievance = async (grievanceId, responseData) => {
  try {
    const response = await api.post(`grievances/${grievanceId}/respond/`, responseData);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Failed to respond to grievance';
  }
};

export const updateGrievanceStatus = async (grievanceId, status) => {
  try {
    const response = await api.patch(`grievances/${grievanceId}/status/`, { status });
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Failed to update grievance status';
  }
};

export const getUserProfile = async () => {
  try {
    const response = await api.get('user/profile/');
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Failed to fetch user profile';
  }
};

export default api;