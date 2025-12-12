import axios from "axios";

const API = "http://127.0.0.1:8000/entries";

function token() {
  return localStorage.getItem("token");
}

export const getEntries = () =>
  axios.get(API, { headers: { auth: token() } });

export const createEntry = (data) =>
  axios.post(API, data, { headers: { auth: token() } });

// FIXED FUNCTION ↓↓↓
export function getEntryById(id) {
  return axios.get(`${API}/${id}`, {
    headers: { auth: token() }
  });
}

// NEW — Delete entry
export const deleteEntry = (id) =>
  axios.delete(`${API}/${id}`, { headers: { auth: token() } });

