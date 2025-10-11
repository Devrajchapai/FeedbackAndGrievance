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
    const payload = { username: email, password };
    console.log('Login payload:', JSON.stringify(payload, null, 2)); // Log payload
    const response = await api.post('token/', payload);
    const { access, refresh } = response.data;
    await AsyncStorage.setItem('accessToken', access);
    await AsyncStorage.setItem('refreshToken', refresh);
    console.log('Login successful, tokens saved');
    return response.data;
  } catch (error) {
    console.log('Login error:', JSON.stringify(error.response?.data, null, 2)); // Log detailed error
    throw error.response?.data || { detail: 'Login failed. Please check your email and password.' };
  }
};

 
export const register = async (userData) => {
  try {
    const response = await api.post('register/', userData);
    const data = await response.json();

      if (response.ok) {
        // ✅ Save token so layout.js sees it
        await AsyncStorage.setItem("accessToken", data.access);
        await AsyncStorage.setItem("refreshToken", data.refresh);

        Alert.alert("Signup successful!");
        navigation.replace("HomeScreen"); // redirect to home
      } else {
        Alert.alert("Login failed", data.detail || "Invalid credentials");
      }
    return response.data;
  } catch (error) {
    console.log('Signup error:', error.response?.data); // Log backend error for debugging
    throw error.response?.data || { message: 'Signup failed. Please check your input and try again.' };
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

 
export const getProvinces = async () => {
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

export const submitFeedback = async (municipalityId, departmentId, feedbackData, imageFile = null) => {
  try {
    const formData = new FormData();
    formData.append('rating', feedbackData.rating);
    formData.append('comment', feedbackData.comment);
    formData.append('municipality', municipalityId);
    formData.append('department', departmentId);
    if (imageFile) {
      formData.append('image', {
        uri: imageFile.uri,
        type: imageFile.type || 'image/jpeg',
        name: imageFile.fileName || 'image.jpg',
      });
    }
    const response = await api.post(`municipalities/${municipalityId}/departments/${departmentId}/feedback/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Failed to submit feedback';
  }
};

export const submitGrievance = async (municipalityId, departmentId, grievanceData, imageFile = null) => {
  try {
    const formData = new FormData();
    formData.append('title', grievanceData.title);
    formData.append('description', grievanceData.description);
    formData.append('municipality', municipalityId);
    formData.append('department', departmentId);
    if (imageFile) {
      formData.append('image', {
        uri: imageFile.uri,
        type: imageFile.type || 'image/jpeg',
        name: imageFile.fileName || 'image.jpg',
      });
    }
    const response = await api.post(`municipalities/${municipalityId}/departments/${departmentId}/grievance/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
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
    const response = await api.post(`grievances/${grievanceId}/`, responseData);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Failed to respond to grievance';
  }
};

export const updateGrievanceStatus = async (grievanceId, status) => {
  try {
    if (!['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'].includes(status)) {
      throw new Error(`Invalid status. Must be one of: OPEN, IN_PROGRESS, RESOLVED, CLOSED`);
    }
    const response = await api.patch(`grievances/${grievanceId}/`, { status });
    return response.data;
  } catch (error) {
    throw error.response?.data?.status || error.message || 'Failed to update grievance status';
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
