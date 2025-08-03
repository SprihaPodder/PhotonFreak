// photonfreak-dashboard/src/api.js

import axios from "axios";

// Set the base URL for the FastAPI backend
const API_BASE_URL = "http://127.0.0.1:8000"; // If deployed, replace with your deployed backend URL

// Call /predict/battery
export const predictBatterySOH = async (batteryData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/predict/battery`, batteryData);
    return response.data;
  } catch (error) {
    console.error("Battery prediction failed:", error);
    throw error;
  }
};

// Call /predict/solar
export const predictSolarOutput = async (solarData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/predict/solar`, solarData);
    return response.data;
  } catch (error) {
    console.error("Solar prediction failed:", error);
    throw error;
  }
};
