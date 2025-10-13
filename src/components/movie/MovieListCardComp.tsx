import type {IMovie} from "../../models/IMovie.ts";
import {type FC} from "react";
import {getImage} from "../../services/api.service.ts";

type MovieCompType = {
    movie: IMovie
}

export const MovieListCardComp: FC<MovieCompType> = ({movie}) => {
    return (
        <div className={"movie_card"}>
            <img src={getImage(movie.poster_path)} alt={'poster'}/>
            <p>{movie.title}</p>
        </div>
    );
};