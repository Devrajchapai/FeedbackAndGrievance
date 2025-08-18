import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Set API_BASE_URL based on platform
const API_BASE_URL = Platform.OS === 'ios' ? 'http://localhost:8000/api/' : 
                    Platform.OS === 'android' ? 'http://10.0.2.2:8000/api/' : 
                    'http://192.168.0.102:8000/api/'; // Replace with your host machine's IP for physical devices

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // Increased timeout to 30 seconds
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Request:', config.method.toUpperCase(), config.url, config.data);
    return config;
  },
  (error) => {
    console.error('Request error:', error.message);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('Response:', response.status, response.data);
    return response;
  },
  (error) => {
    const message = error.response?.data?.detail ||
                   error.response?.data?.email?.[0] ||
                   error.response?.data?.non_field_errors?.[0] ||
                   error.message ||
                   'Unknown network error';
    console.error('Response error:', message, error.config?.url);
    return Promise.reject(new Error(message));
  }
);

export const login = async (email, password) => {
  try {
    const response = await api.post('token/', { username: email, password });
    console.log('Login response:', response.data);
    await AsyncStorage.setItem('authToken', response.data.access);
    return response.data;
  } catch (error) {
    console.error('Login error:', error.message);
    throw new Error(error.message);
  }
};

export const register = async (email, password, confirmPassword) => {
  try {
    const response = await api.post('register/', { email, password1: password, password2: confirmPassword });
    console.log('Register response:', response.data);
    await AsyncStorage.setItem('authToken', response.data.access);
    return response.data;
  } catch (error) {
    console.error('Register error:', error.message);
    throw new Error(error.message);
  }
};

export const logout = async () => {
  await AsyncStorage.removeItem('authToken');
};

export const getProvinces = async () => {
  try {
    const response = await api.get('provinces/');
    return response.data;
  } catch (error) {
    console.error('Get provinces error:', error.message);
    throw error;
  }
};

export const getMunicipalities = async (stateId) => {
  try {
    const response = await api.get(`municipalities/?state=${stateId}`);
    return response.data;
  } catch (error) {
    console.error('Get municipalities error:', error.message);
    throw error;
  }
};

export const submitFeedback = async (municipalityId, departmentId, rating, comment) => {
  try {
    const response = await api.post(`municipalities/${municipalityId}/departments/${departmentId}/feedback/`, { rating, comment, municipality: municipalityId });
    return response.data;
  } catch (error) {
    console.error('Submit feedback error:', error.message);
    throw error;
  }
};

export const submitGrievance = async (municipalityId, departmentId, title, description) => {
  try {
    const response = await api.post(`municipalities/${municipalityId}/departments/${departmentId}/grievance/`, { title, description, municipality: municipalityId });
    return response.data;
  } catch (error) {
    console.error('Submit grievance error:', error.message);
    throw error;
  }
};