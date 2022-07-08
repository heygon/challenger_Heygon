import axios from 'axios';

const api = axios.create({
    baseURL : 'http://localhost:3678'
})

export default api;
