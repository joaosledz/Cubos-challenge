import axios from 'axios';
const api = axios.create({
    baseURL: process.env.API_URL,
    headers: { Authorization: 'Bearer ' + process.env.API_KEY },
});

export default api;
