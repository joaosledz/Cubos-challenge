import { GetStaticProps } from 'next';
import { api, responseMovies } from 'services';
import Head from 'next/head';
import styles from '@/styles/app.module.scss';

type Data = {
    data: responseMovies;
};
export default function Home({ data }: Data) {
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
                {data.results.map(movie => (
                    <a>{movie.original_title}</a>
                ))}
                <ul className={styles.movieList}>
                    <li className={styles.movieCard}>Filme 1</li>
                </ul>
            </div>
        </div>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const { data } = await api.get(`movie/popular?`);

    // const episode = {
    //   id: data.id,
    // }

    return {
        props: {
            data,
        },
        revalidate: 60 * 60 * 24, // 24 hours
    };
};
