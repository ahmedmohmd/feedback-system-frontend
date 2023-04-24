import config from "../config/config";
import httpService from "./httpService";

// Token Handling
const setToken = (token: string) => localStorage.setItem("token", token);
const removeToken = () => localStorage.removeItem("token");
const getToken = () => localStorage.getItem("token");

const login = (userData) => {
  return httpService.post(`${config.baseUrl}/auth/login`, userData);
};

const register = (userData) => {
  return httpService.post(`${config.baseUrl}/auth/register`, userData);
};

const logout = () => {
  return httpService.post(`${config.baseUrl}/auth/logout`);
};

const resetRequest = (userData) => {
  return httpService.post(`${config.baseUrl}/auth/reset`, userData);
};

const newPassword = (userData) => {
  return httpService.post(`${config.baseUrl}/auth/new-password`, userData);
};

export default {
  newPassword,
  login,
  register,
  setToken,
  removeToken,
  logout,
  resetRequest,
  getToken,
};
