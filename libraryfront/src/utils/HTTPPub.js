import axios from "axios";
const axiosApiInstance=  axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-type": "application/json"
  }
});
export default axiosApiInstance;