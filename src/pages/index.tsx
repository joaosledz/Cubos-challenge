import { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { api, responseMovies } from 'services';
import Link from 'next/link';
import Head from 'next/head';
import styles from '@/styles/app.module.scss';

type Data = {
    data: responseMovies;
};

export default function Home({ data }: Data) {
    const [page, setPage] = useState<number>(1);
    const [min, setMin] = useState<number>(0);
    const [max, setMax] = useState<number>(4);
    const handlePagination = (index: number) => {
        let show = false;
        switch (page % 4) {
            case 0:
                if (0 <= index && index < 5) show = true;
            case 1:
                if (0 <= index && index < 5) show = true;
            case 2:
                if (0 <= index && index < 5) show = true;
            case 3:
                if (0 <= index && index < 5) show = true;
        }
        return show;
    };
    useEffect(() => {}, [page]);
    return (
        <div className={styles.homepage}>
            <Head>
                <title>Cinemundo</title>
                <link rel="icon" href="/movie.png" />
            </Head>
            <div className={styles.content}>
                <div className={styles.searchBarContainer}>
                    <input className={styles.searchBar} type="text" />
                </div>
                {/* <p>{JSON.stringify(data)}</p> */}
                <section className={styles.movieList}>
                    {data.results.map((movie, index) => (
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
