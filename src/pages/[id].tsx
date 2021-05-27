import { GetStaticProps, GetStaticPaths } from 'next';
import { api, responseMovies, Movie } from 'services';
// import Link from 'next/link';
import styles from '@/styles/app.module.scss';

type MovieData = {
    movie: Movie;
};
export default function Home({ movie }: MovieData) {
    return (
        <div className={styles.homepage}>
            <h2>{movie.title}</h2>
            <img
                src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                alt={movie.title}
            />
        </div>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await api.get<responseMovies>(
        `movie/popular?&language=pt-BR`
    );

    const paths = data.results.map(movie => {
        return {
            params: {
                id: movie.id.toString(),
            },
        };
    });

    return {
        paths,
        fallback: 'blocking',
    };
};

export const getStaticProps: GetStaticProps = async ctx => {
    const { id } = ctx.params!;
    const { data } = await api.get(`movie/${id}?&language=pt-BR`);
    // const { data } = await api.get(`movie/popular?&language=pt-BR`);

    return {
        props: {
            movie: data,
        },
        // revalidate: 60 * 60 * 24, // 2 hours
    };
};
