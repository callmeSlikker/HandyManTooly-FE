import API from "../api/interceptors"; // Assuming you have the axios instance set up

// ✅ ดึงข้อมูลจังหวัดทั้งหมด
export const getProvinces = async () => {
  return API.get("/locations/provinces"); // Endpoint for getting provinces
};

// ✅ ดึงข้อมูลอำเภอของจังหวัด
export const getAmphures = async (provinceId) => {
  return API.get(`/locations/provinces/${provinceId}/amphures`); // Endpoint for getting amphures of a specific province
};

// ✅ ดึงข้อมูลตำบลของอำเภอ
export const getTambons = async (provinceId, amphureId) => {
  return API.get(`/locations/provinces/${provinceId}/amphures/${amphureId}/tambons`); // Endpoint for getting tambons of a specific amphure
};
