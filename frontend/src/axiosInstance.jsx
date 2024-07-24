import axios from "axios";

export const customAxios = axios.create({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});
