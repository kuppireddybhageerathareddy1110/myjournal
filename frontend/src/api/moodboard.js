import axios from "axios";

const API = "http://localhost:8000/board";

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
