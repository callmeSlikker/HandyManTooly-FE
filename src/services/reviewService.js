import API from "../api/interceptors";

// ดึงโพสต์ทั้งหมด ตามพื้นที่ที่เลือก
export const review = async (request) => {
    return API.post(`/reviews`, request);
  };