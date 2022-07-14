import http from '../utils/HTTP'

const getAllUsers = ()=>{
    return  http.get("/users");
}

const updateOne = (id, data) => {
    return http.put(`/users/${id}`, data);
  };

  const removeOne = id => {
    return http.delete(`/users/${id}`);
  };
const getOne = id => {
    return http.get(`/users/${id}`);
  };
  
  const createOne = data => {
    return http.post("/users", data);
  };

const userService = {
  getAllUsers,
    updateOne,
    removeOne,
    getOne,
    createOne
}

export default  userService