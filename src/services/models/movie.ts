export type Movie = {
    adult: boolean;
    backdrop_path: string;
    genre_ids?: number[];
    genres?: Genre[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    status: string;
    runtime: number;
    spoken_languages: language[];
    budget: number;
    revenue: number;
};

export type language = {
    english_name: string;
    iso_639_1: string;
    name: string;
};

export type Genre = {
    id: number;
    name: string;
};

export type responseMovies = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
};

export type Video = {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    site: string;
    size: number;
    type: string;
};
