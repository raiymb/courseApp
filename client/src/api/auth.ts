import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });
  return response.data;
};

export const register = async (data: { email: string; password: string; firstName: string; lastName: string }) => {
  const response = await axios.post(`${API_URL}/register`, data);
  return response.data; // Returns success message and user info
};

export const logout = async () => {
  await axios.post("/api/auth/logout");
};