import axios from "axios";



// call api
const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

// Hiển thị thông tin
export const getUser = (userId) => API.get(`/user/${userId}`)

//Sửa thông tin người dùng
export const updateUser = (id, formData) =>  API.put(`/user/${id}`, formData);

// hiển thị đanh sách người dừng
export const getAllUser = () =>  API.get('/user')

// theo dõi 
export const followUser = (id, data) => API.put(`/user/${id}/follow`, data) 

// bỏ theo dõi
export const unfollowUser = (id, data) => API.put(`/user/${id}/unfollow`, data) 
