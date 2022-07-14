import http from '../utils/HTTP'
import jwt_decode from "jwt-decode";

const login = (data) => {
    return http.post("/login", data);
}

const register = (data) => {
    return http.post("/register", data);
}

const forgot = (data) => {
    return http.post('/forgotpassword', data);
}

const reset = (data) => {
    return http.post('/resetpassword', data);
}

const isAuthentificated = () => {
    const token = localStorage.getItem('token')
    if (token != null) {
        var decoded = jwt_decode(token);
        var datenow = new Date();
        const milliseconds = decoded.exp * 1000
        const expdate = new Date(milliseconds)
       
        if (datenow < expdate)
        {
            return true;
        }
        else { 
            localStorage.removeItem('token')
            return false;
         }
    }
    else {
        return false;
    }
}


const getAuthUserId = ()=>{
    const token = localStorage.getItem('token')
    if (token != null) {
        var decoded = jwt_decode(token);
        return decoded.user_id
    }else{
        return '';
    }
}
const auth = {
    login,
    register,
    forgot,
    reset,
    isAuthentificated,
    getAuthUserId
}

export default auth