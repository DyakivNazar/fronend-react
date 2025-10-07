import type {IMovie} from "../../models/IMovie.ts";
import {type FC} from "react";

type MovieCompType = {
    movie: IMovie
}

export const MovieComp: FC<MovieCompType> = ({movie}) => {
    return (
        <div>
            <p>{movie.id}</p>
            <p>{movie.original_title}</p>
            <p>{movie.overview}</p>
            <p>{movie.vote_average}</p>
        </div>
    );
};