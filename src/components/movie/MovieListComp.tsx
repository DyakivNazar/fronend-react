import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import {useEffect} from "react";
import {moviesSliceActions} from "../../redux/slices/movieSlice.ts";
import {MovieListCardComp} from "./MovieListCardComp.tsx";
import './movie.css'

export const MovieListComp = () => {

    const {movies} = useAppSelector(({movieSlice}) => movieSlice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!movies.length) {
            dispatch(moviesSliceActions.loadMovies());
        }
    }, [dispatch, movies.length]);


    return (
        <section className={"movie_list"}>
            {movies.map((movie) => <MovieListCardComp key={movie.id} movie={movie} />)}
        </section>
    );
};