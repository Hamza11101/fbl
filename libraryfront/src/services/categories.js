import http from '../utils/HTTP'

const getAllCategories = ()=>{
    return  http.get("/categories");
}
const getAllLivres = ()=>{
    return  http.get("/categories/livres");
}

const updateOne = (id, data) => {
    return http.put(`/categories/${id}`, data);
  };

  const removeOne = id => {
    return http.delete(`/categories/${id}`);
  };
const getOne = id => {
    return http.get(`/categories/${id}`);
  };
  
  const createOne = data => {
    return http.post("/categories", data);
  };

const userService = {
    getAllCategories,
    updateOne,
    removeOne,
    getOne,
    createOne,
    getAllLivres
}

export default  userService