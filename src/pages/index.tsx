import { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { api, responseMovies, movieApi, Movie, Genre } from 'services';
import Link from 'next/link';
import Head from 'next/head';
import { dateToLocale, isYear } from 'utils/functions';
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

    //Como essa biblioteca não permite definir o page_size tive que adaptar
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

    const getMoviesByTitle = async () => {
        movieApi
            .search(query)
            .then(response => {
                setMovies(response.data.results);
                setPage(1);
                setQuery('');
            })
            .catch(err => {
                console.log(err);
            });
    };

    const getMoviesByGenre = (genreId: string | number) => {
        movieApi
            .discoverGenre(genreId)
            .then(response => {
                setMovies(response.data.results);
                setPage(1);
                setQuery(genres![genreId]);
            })
            .catch(err => console.log(err));
    };
    const getMoviesByYear = (year: string | number) => {
        movieApi
            .discoverYear(year)
            .then(response => {
                console.log(response.data);
                setMovies(response.data.results);
                setPage(1);
            })
            .catch(err => console.log(err));
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
    const handleSearch = async () => {
        const year = await isYear(query);
        if (year) getMoviesByYear(query);
        else if (genres) {
            Object.entries(genres).forEach(genre => {
                if (
                    genre[1].toLocaleLowerCase() === query.toLocaleLowerCase()
                ) {
                    getMoviesByGenre(genre[0]);
                    return;
                }
            });
        } else getMoviesByTitle();
    };
    const handleKeyPress = (key: string) => {
        if (key === 'Enter') {
            handleSearch();
            getMoviesByTitle();
        }
    };
    useEffect(() => {
        handlePagination();
        // console.log('page:', page);
    }, [page]);
    useEffect(() => {
        getGenresList();
    }, []);

    const Card = (movie: Movie) => {
        return (
            <div className={styles.movieCard}>
                <Link href={`/${movie.id}`}>
                    <img
                        className={styles.imagePC}
                        src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                        alt={movie.title}
                    />
                </Link>
                <div className={styles.rightCard}>
                    <Link href={`/${movie.id}`}>
                        <div className={styles.titleContainer}>
                            <h2 className={styles.movieTitle}>{movie.title}</h2>
                        </div>
                    </Link>
                    <Link href={`/${movie.id}`}>
                        <div className={styles.imageMobileContainer}>
                            <img
                                className={styles.imageMobile}
                                src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                                alt={movie.title}
                            />
                        </div>
                    </Link>
                    <div className={styles.score}>
                        {movie.vote_average * 10}%
                    </div>

                    <div className={styles.overviewAndGenres}>
                        <a>{dateToLocale(movie.release_date)}</a>
                        <p>{movie.overview}</p>
                        <div className={styles.genresContainer}>
                            {genres &&
                                movie.genre_ids &&
                                movie.genre_ids.map(genre_id => (
                                    <div
                                        className={styles.genre}
                                        onClick={() =>
                                            getMoviesByGenre(genre_id)
                                        }
                                    >
                                        {genres[genre_id]}
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

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
                                <Card {...movie} />
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
