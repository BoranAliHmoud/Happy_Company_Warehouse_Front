import axios from 'axios';

// إعداد Axios
const api = axios.create({
  baseURL: localStorage.getItem('authToken'), // استبدلها بالرابط الأساسي لـ API الخاص بك
});

// إضافة interceptor لإضافة التوكن إلى كل الطلبات
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken'); // استرجاع التوكن من localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // إضافة التوكن إلى ترويسة الطلب
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;