import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/dietPlan"; 
export const getAllDietPlans = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createDietPlan = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const updateDietPlan = async (id, updatedData) => {
  const res = await axios.put(`${API_URL}/${id}`, updatedData);
  return res.data.data;
};

export const deleteDietPlan = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};