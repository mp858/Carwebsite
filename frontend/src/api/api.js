import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const signup = (data) => API.post("/auth/signup", data);
export const login = (data) => API.post("/auth/login", data);
export const createCar = (data) => API.post("/cars/create", data);
export const getCars = () => API.get("/cars");
export const getCar = (id) => API.get(`/cars/${id}`);
export const updateCar = (id, data) => API.put(`/cars/${id}/update`, data);
export const deleteCar = (id) => API.delete(`/cars/${id}/delete`);
