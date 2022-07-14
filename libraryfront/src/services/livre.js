import http from '../utils/HTTP'
import http2 from '../utils/HTTPFormData'

const getAllLivre = ()=>{
    return  http.get("/livres");
}

const updateOne = (id, data) => {
    return http2.put(`/livres/${id}`, data);
  };

  const removeOne = id => {
    return http.delete(`/livres/${id}`);
  };
const getOne = id => {
    return http.get(`/livres/${id}`);
  };
  
  const createOne = data => {
    return http2.post("/livres", data);
  };

const livreService = {
    getAllLivre,
    updateOne,
    removeOne,
    getOne,
    createOne,
}

export default  livreService