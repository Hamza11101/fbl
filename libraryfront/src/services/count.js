import http from '../utils/HTTP'


const getAllStats = ()=>{
    return  http.get("/count");
}



const countService = {
    getAllStats,
   
}

export default  countService