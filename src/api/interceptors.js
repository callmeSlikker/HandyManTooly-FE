import axios from 'axios';

const API = axios.create({
  baseURL: 'https://handy-man-tooly.vercel.app', // เปลี่ยนเป็น URL ของ Backend
});

// เพิ่ม Token เข้า Headers ถ้าผู้ใช้ล็อกอิน
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
