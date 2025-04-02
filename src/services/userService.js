import API from "../api/interceptors";

// ✅ ดึงข้อมูลผู้ใช้ที่ล็อกอินอยู่
export const getMe = async (params) => {
  const token = localStorage.getItem("token");
  const queryString = new URLSearchParams(params).toString();
  try {
    const response = await API.get(`/users/me?${queryString}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    localStorage.removeItem("token");
  }
};

// ✅ สมัครสมาชิก
export const register = async (userData) => {
  return API.post("/users/register", userData);
};

export const getUserById = async (userId) => {
  return API.get(`/users/${userId}`);
};

// ✅ ล็อกอิน
export const login = async (credentials) => {
  const response = await API.post("/users/login", credentials);
  localStorage.setItem("token", response.data.token); // เก็บ Token
  return response.data;
};

// ✅ อัปเดตข้อมูลผู้ใช้
export const updateUser = async (userData) => {
  const token = localStorage.getItem("token");
  return API.put("/users/me", userData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
