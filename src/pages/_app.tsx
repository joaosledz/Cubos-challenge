import { AppProps } from 'next/app';
import '@/styles/global.scss';
import styles from '@/styles/app.module.scss';
import { Header } from '@/components/header';

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className={styles.root}>
            <Header />
            <Component {...pageProps} />
        </div>
    );
}
