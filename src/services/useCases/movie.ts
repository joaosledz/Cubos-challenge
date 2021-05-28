import api from '../api';
import { Genre } from '../models/movie';

const language = 'language=pt-BR';
const movieApi = {
    // getMovie: (credential: string) => api.get<Movie>(userUrls.show + credential),
    // searchMovies: (username: string) => api.get<Movie>(`name=${username}`),
    getVideos: (movieId: number | string) =>
        api.get(`movie/${movieId}/videos?&${language}`),
    search: (query: string) =>
        api.get(`search/movie?query=${query}&${language}`),
    genres: () => api.get(`genre/movie/list?${language}`),
    discoverGenre: (genreId: number | string) =>
        api.get(`discover/movie?with_genres=${genreId}&${language}`),
    discoverYear: (year: number | string) =>
        api.get(`discover/movie?year=${year}&${language}`),
};

export default movieApi;
