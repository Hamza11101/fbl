import axios from "axios";
const axiosApiInstance=  axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-type": "multipart/form-data"
  }
});


// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async config => {
    const token = localStorage.getItem('token');
    config.headers = { 
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
    return config;
  },
  error => {
    Promise.reject(error)
});

export default axiosApiInstance;