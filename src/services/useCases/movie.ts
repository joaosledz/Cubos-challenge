import api from '../api';
import { Movie } from '../models/movie';

const userApi = {
    // getMovie: (credential: string) => api.get<Movie>(userUrls.show + credential),
    searchMovies: (username: string) => api.get<Movie>(`name=${username}`),
};

export default userApi;
