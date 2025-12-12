import axios from "axios";
import { API_BASE } from "./config";

const API = `${API_BASE}/entries`;

function token() {
  return localStorage.getItem("token");
}

export const getEntries = () =>
  axios.get(API, { headers: { auth: token() } });

export const createEntry = (data) =>
  axios.post(API, data, { headers: { auth: token() } });

export function getEntryById(id) {
  return axios.get(`${API}/${id}`, {
    headers: { auth: token() },
  });
}

export const deleteEntry = (id) =>
  axios.delete(`${API}/${id}`, { headers: { auth: token() } });
