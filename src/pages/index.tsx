import Head from 'next/head';
import styles from '@/styles/app.module.scss';

export default function Home() {
    return (
        <div className={styles.homepage}>
            <Head>
                <title>Cinemundo</title>
                <link rel="icon" href="/movie.png" />
            </Head>
            <section className={styles.content}>
                <input type="text" />
            </section>
        </div>
    );
}
