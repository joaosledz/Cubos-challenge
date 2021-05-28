import { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { api, responseMovies, movieApi, Movie } from 'services';
import Link from 'next/link';
import Head from 'next/head';
import styles from '@/styles/app.module.scss';

type Data = {
    data: responseMovies;
};

export default function Home({ data }: Data) {
    const [movies, setMovies] = useState<Movie[]>(data.results);
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
        // console.log(min, max);
    }, [min, max]);
    return (
        <div className={styles.homepage}>
            <Head>
                <title>Cinemundo</title>
                <link rel="icon" href="/movie.png" />
            </Head>
            <div className={styles.content}>
                <div className={styles.searchBarContainer}>
                    <input
                        className={styles.searchBar}
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        onKeyPress={e => handleKeyPress(e.key)}
                    />
                </div>
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
                                        <p>{movie.overview}</p>
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

    // const episode = {
    //   id: data.id,
    // }

    return {
        props: {
            data,
        },
        // revalidate: 60 * 60 * 2, // 2 hours
    };
};
