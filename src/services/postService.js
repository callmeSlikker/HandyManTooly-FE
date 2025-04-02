import API from "../api/interceptors";

// สร้างโพสต์ใหม่
export const createPost = async (postData) => {
  return API.post('/posts', postData);
};

// ดึงโพสต์ทั้งหมด ตามพื้นที่ที่เลือก
export const getPosts = async (params) => {
  // Convert params object to a query string
  const queryString = new URLSearchParams(params).toString();

  return API.get(`/posts?${queryString}`);
};

// ดึงโพสต์ตาม ID
export const getPostById = async (postId) => {
  return API.get(`/posts/${postId}`);
};
