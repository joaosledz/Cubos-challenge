import { useState, useEffect } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { api, responseMovies, Movie, Video, movieApi } from 'services';
// import Link from 'next/link';
import styles from '@/styles/details.module.scss';

type MovieData = {
    movie: Movie;
};
// type VideoData = {
//     videos: Video[];
// };
export default function Home(
    { movie }: MovieData /* , { videos }: VideoData*/
) {
    const [video, setVideo] = useState<Video>();
    useEffect(() => {
        const getVideos = async () => {
            movieApi
                .getVideos(movie.id)
                .then(response => {
                    setVideo(response.data.results[0]);
                })
                .catch(err => {
                    console.log('erro');
                });
        };
        getVideos();
    }, [movie]);
    return (
        <div className={styles.homepage}>
            <div className={styles.titleContainer}>
                <h2>{movie.title}</h2>
                <a>{movie.release_date}</a>
            </div>
            <div className={styles.descriptionAndImage}>
                <div className={styles.descriptionContainer}>
                    <div className={styles.sinopse}>
                        <h3>Sinopse</h3>
                        <p>{movie.overview}</p>
                    </div>
                    <div className={styles.informationContainer}>
                        <h3>Informações</h3>
                        <div></div>
                    </div>
                    <div className={styles.genresContainer}>
                        {movie.genres &&
                            movie.genres.map(genre => (
                                <div className={styles.genre}>{genre.name}</div>
                            ))}
                    </div>
                </div>
                <div>
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                    />
                </div>
            </div>
            {/* <div> */}
            {video && (
                <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video.key}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                />
            )}
            {/* </div> */}
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
    // const videos = await api.get(`movie/${id}/videos?&language=pt-BR`);

    return {
        props: {
            movie: data,
            // videos: videos.data,
        },
        // revalidate: 60 * 60 * 24, // 2 hours
    };
};
