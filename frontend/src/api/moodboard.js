import axios from "axios";
import { API_BASE } from "./config";

const API = `${API_BASE}/board`;

export function getBoardItems(token) {
  return axios.get(API + "/", {
    headers: { auth: token },
  });
}

export function createBoardItem(item, token) {
  return axios.post(API + "/", item, {
    headers: { auth: token },
  });
}

export function deleteBoardItem(id, token) {
  return axios.delete(`${API}/${id}`, {
    headers: { auth: token },
  });
}
