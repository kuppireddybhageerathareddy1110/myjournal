import axios from "axios";

const API = "http://127.0.0.1:8000/auth";

export const login = (data) => axios.post(`${API}/login`, data);
export const signup = (data) => axios.post(`${API}/signup`, data);
