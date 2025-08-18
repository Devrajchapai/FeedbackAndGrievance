// src/config.ts
export const API_BASE_URL = __DEV__
  ? "http://10.0.2.2:8000/api"   // Android emulator
  : "http://localhost:8000/api"; // adjust for iOS sim or prod
