import api from './axiosInstance';

// Generate QR code
export const generateQrcode = async (params?: any) => {
  const { data } = await api.get('/captchaImage', { params });
  return data;
};

// Login
export const loginApi = async (payload: any) => {
  const { data } = await api.post('/login', payload);
  return data;
};

export { api };
