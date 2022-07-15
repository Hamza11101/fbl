import http from '../utils/HTTP'
import http2 from '../utils/HTTPFormData'
import http3 from '../utils/HTTPPub'
const getAllLivre = ()=>{
    return  http.get("/livres");
}
const getAllLivrePuvb = ()=>{
  return  http3.get("/livres");
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
    getAllLivrePuvb
}

export default  livreService