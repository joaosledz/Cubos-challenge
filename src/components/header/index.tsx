import styles from './styles.module.scss';
import Link from 'next/link';
export function Header() {
    return (
        <header className={styles.headerContainer}>
            <Link href="/">
                <h1>Movies</h1>
            </Link>
        </header>
    );
}
