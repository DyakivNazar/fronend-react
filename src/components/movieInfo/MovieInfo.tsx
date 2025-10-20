import {useParams} from "react-router-dom";
import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import {useEffect} from "react";
import {moviesSliceActions} from "../../redux/slices/movieSlice.ts";
import {getImage} from "../../services/api.service.ts";
import "./movieInfo.css";
import {StarsRating} from "../stars/StarsRating.tsx";

export const MovieInfo = () => {
    const {id} = useParams();

    const {movieInfo} = useAppSelector(({movieSlice}) => movieSlice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (id) {
            dispatch(moviesSliceActions.clearMovieInfo())
            dispatch(moviesSliceActions.loadMovieInfo(id));
        }
    }, [id]);

    if (!movieInfo) {
        return <p>Loading...</p>;
    }

    const formatRuntime = (minutes: number): string => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };


    return (
        <div>
            <img className={"backdrop"} src={getImage(movieInfo.backdrop_path)}
                 alt={`backdrop for movie ${movieInfo.title}`}/>
            <div className={"movie_content"}>
                <div className={"movie_poster"}>
                    <img className={"poster"} src={getImage(movieInfo.poster_path)}
                         alt={`poster for movie ${movieInfo.title}`}/>
                    <div className={"vote"}>
                        <StarsRating value={movieInfo.vote_average}/>
                        <p>{movieInfo.vote_count} vote</p>
                    </div>
                </div>

                <div className={"movie_info"}>
                    <h1>{movieInfo.title}</h1>
                    <div className={"movie_meta"}>
                        <span>{movieInfo.original_title}</span>
                        <span className={"dot"}>•</span>
                        <span>{movieInfo.release_date ? new Date(movieInfo.release_date).getFullYear() : '-'}</span>
                        <span className={"dot"}>•</span>
                        <span>{formatRuntime(movieInfo.runtime)}</span>
                    </div>
                    <p>{movieInfo.overview}</p>
                    <div className={"genre_in_info"}>
                        {movieInfo.genres.map((genre) => <li>{genre.name}</li>)}
                    </div>
                </div>
            </div>
        </div>
    );
};