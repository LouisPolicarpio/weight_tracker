import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/log";
export const getAllLogs = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createLog = async (newLog) => {
  const res = await axios.post(API_URL, newLog);
  return res.data;
};

export const updateLog = async (id, updatedData) => {
  const res = await axios.put(`${API_URL}/${id}`, updatedData);
  return res.data.data;
};

export const deleteLog = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};

export const getLatestLogs = async (n = 1) => {
  const res = await axios.get(`${API_URL}/latest?n=${n}`);
  return res.data;
};
