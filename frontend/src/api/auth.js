import axios from "axios";
import { API_BASE } from "./config";

const API = `${API_BASE}/auth`;

export const login = (data) => axios.post(`${API}/login`, data);
export const signup = (data) => axios.post(`${API}/signup`, data);
