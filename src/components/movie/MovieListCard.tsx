import type {IMovie} from "../../models/IMovie.ts";
import {type FC, memo} from "react";
import {getImage} from "../../services/api.service.ts";
import {useNavigate} from "react-router-dom";
import type {IGenre} from "../../models/IGenre.ts";

type MovieCompType = {
    movie: IMovie,
    genres: IGenre[],
}

export const MovieListCard: FC<MovieCompType> = memo(({movie, genres}) => {
    const navigate = useNavigate();
    const onMovieClick = () => {
        navigate("/movies/" + movie.id);
    }

    const genreName = movie.genre_ids?.map((id) => genres.find((g) => g.id === id)?.name)
        .filter(Boolean)[0] || "-"

    return (
        <div className={"movie_card"} onClick={onMovieClick}>
            <img src={getImage(movie.poster_path)} alt={`poster for movie ${movie.title}`}/>
            <div className={"movie_info_card"}>
                <p>{movie.title}</p>
                <div>
                    <p>{movie.release_date ? new Date(movie.release_date).getFullYear() : '-'}</p>
                    <p>{genreName}</p>
                </div>
            </div>
        </div>
    );
});