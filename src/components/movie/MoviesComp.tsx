import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import {useEffect} from "react";
import {moviesSliceActions} from "../../redux/slices/movieSlice.ts";
import {MovieComp} from "./MovieComp.tsx";

export const MoviesComp = () => {

    const {movies} = useAppSelector(({movieSlice}) => movieSlice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!movies.length) {
            dispatch(moviesSliceActions.loadMovies());
        }
    }, [dispatch, movies.length]);


    return (
        <>
            {movies.map((movie) => <MovieComp key={movie.id} movie={movie} />)}
        </>
    );
};