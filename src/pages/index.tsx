import Head from 'next/head';
import styles from '@/styles/app.module.scss';

export default function Home() {
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
                <ul className={styles.movieList}>
                    <li className={styles.movieCard}>Filme 1</li>
                </ul>
            </div>
        </div>
    );
}
