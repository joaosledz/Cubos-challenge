import axios from 'axios';
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        Authorization:
            'Bearer ' +
            'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOWFiODUwYWE5MzVkMjRjYWM4MDdlNzIwZTU5MjYyOSIsInN1YiI6IjYwYWM0YTM5MGE1MTdjMDA1NmJlMjVjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p8dYSJidj9Jk6oxPhRxcPurIw6eCeRHzijUX5_eyY9I',
    },
});

export default api;
