import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const searchMedicines = async (name) => {
  const response = await api.get(`/medicines?name=${name}`);
  return response.data;
};

export const getShopsByMedicine = async (medicineId) => {
  const response = await api.get(`/shops/${medicineId}`);
  return response.data;
};

// Admin Endpoints
export const addShop = async (shopData) => {
  const response = await api.post('/shops', shopData);
  return response.data;
};

export const getAllShops = async () => {
  const response = await api.get('/admin/shops');
  return response.data;
};

export const addMedicine = async (medicineData) => {
  const response = await api.post('/medicines', medicineData);
  return response.data;
};

export const addOrUpdateInventory = async (inventoryData) => {
  const response = await api.post('/inventory', inventoryData);
  return response.data;
};

export default api;
