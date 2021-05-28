import { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { api, responseMovies, movieApi, Movie, Genre } from 'services';
import Link from 'next/link';
import Head from 'next/head';
import styles from '@/styles/app.module.scss';

type Data = {
    data: responseMovies;
};
// type genresData = {
//     genres: Genre[];
// };
export type AllGenres = {
    [key: string]: string;
};
export default function Home({ data }: Data /*, { genres }: genresData*/) {
    // console.log(genres);
    const [movies, setMovies] = useState<Movie[]>(data.results);
    const [genres, setGenres] = useState<AllGenres>();
    const [page, setPage] = useState<number>(1);
    const [min, setMin] = useState<number>(0);
    const [max, setMax] = useState<number>(4);
    const [query, setQuery] = useState<string>('');
    const pages = [1, 2, 3, 4, 5];
    const handlePagination = () => {
        const aux = page % 4;
        if (aux == 0) {
            setMin(15);
            setMax(19);
        } else if (aux == 1) {
            setMin(0);
            setMax(4);
        } else if (aux == 2) {
            setMin(5);
            setMax(9);
        } else if (aux == 3) {
            setMin(10);
            setMax(14);
        }
    };

    const getMovieList = async () => {
        movieApi
            .search(query)
            .then(response => {
                setMovies(response.data.results);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const getGenresList = async () => {
        movieApi
            .genres()
            .then(response => {
                let genres = {};
                response.data.genres.forEach((genre: Genre) => {
                    genres = { ...genres, [genre.id]: genre.name };
                });
                setGenres(genres);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleKeyPress = (key: string) => {
        if (key === 'Enter') {
            getMovieList();
        }
    };
    useEffect(() => {
        handlePagination();
        // console.log('page:', page);
    }, [page]);
    useEffect(() => {
        getGenresList();
    }, []);
    return (
        <div className={styles.homepage}>
            <Head>
                <title>Cinemundo</title>
                <link rel="icon" href="/movie.png" />
            </Head>
            <div className={styles.content}>
                <input
                    className={styles.searchBar}
                    type="text"
                    placeholder="Busque um filme por nome, ano ou gênero..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onKeyPress={e => handleKeyPress(e.key)}
                />
                <section className={styles.movieList}>
                    {movies.map((movie, index) => (
                        <>
                            {index >= min && index <= max && (
                                <div className={styles.movieCard}>
                                    <Link href={`/${movie.id}`}>
                                        <img
                                            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                                            alt={movie.title}
                                        />
                                    </Link>
                                    <div>
                                        <div className={styles.titleContainer}>
                                            <h2 className={styles.movieTitle}>
                                                {movie.title}
                                            </h2>
                                        </div>
                                        <div className={styles.score}>
                                            {movie.vote_average * 10}%
                                        </div>
                                        <div
                                            className={styles.overviewAndGenres}
                                        >
                                            <p>{movie.overview}</p>
                                            <div
                                                className={
                                                    styles.genresContainer
                                                }
                                            >
                                                {genres &&
                                                    movie.genre_ids &&
                                                    movie.genre_ids.map(
                                                        genre_id => (
                                                            <div
                                                                className={
                                                                    styles.genre
                                                                }
                                                            >
                                                                {
                                                                    genres[
                                                                        genre_id
                                                                    ]
                                                                }
                                                            </div>
                                                        )
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    ))}
                </section>
                <div className={styles.paginationContainer}>
                    {pages.map(value => (
                        <div
                            className={
                                value === page
                                    ? styles.pageSelected
                                    : styles.pageNumber
                            }
                            onClick={() => setPage(value)}
                        >
                            {value}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const { data } = await api.get(`movie/popular?&language=pt-BR`);
    const response = await movieApi.genres();

    return {
        props: {
            data,
            genres: response.data.genres,
        },
        revalidate: 60 * 60 * 2, // 2 hours
    };
};
