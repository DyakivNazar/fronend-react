import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import {useEffect, useMemo} from "react";
import {moviesSliceActions} from "../../redux/slices/movieSlice.ts";
import {MovieListCard} from "./MovieListCard.tsx";
import './movie.css'
import {Pagination} from "../pagination/Pagination.tsx";
import {useSearchParams} from "react-router-dom";

export const MovieList = () => {

    const {movies, genres, totalPages, loadState} = useAppSelector(({movieSlice}) => movieSlice);
    const dispatch = useAppDispatch();
    const [query] = useSearchParams();

    useEffect(() => {
        const searchM = query.get("query") || "";
        const page = query.get("page") || "1";
        const genreName = query.get("genre") || "";
        const genreIdFromUrl = genres.find(genre => genre.name === genreName)?.id;

        if (genres.length === 0) {
            dispatch(moviesSliceActions.loadGenres());

        }
        if (searchM) {
            dispatch(moviesSliceActions.searchMovies({query: searchM, page}));
            return;
        }
        if (genreIdFromUrl) {
            dispatch(
                moviesSliceActions.loadMovies({
                    genreId: Number(genreIdFromUrl),
                    page,
                })
            );
            return;
        }

        dispatch(moviesSliceActions.loadMovies({page}));

    }, [dispatch, query]);

    const movieCards = useMemo(() => {
        return movies.map(movie => (
            <MovieListCard key={movie.id} movie={movie} genres={genres}/>
        ));
    }, [movies, genres]);

    if (movies.length === 0) {
        return <p className={"not_movie"}>Movies not found</p>
    }

    return (
        <div>
            {!loadState && <div>Loading</div>}
            <div className={"movie_list"}>{movieCards}</div>

            <Pagination
                totalPages={totalPages}
            />
        </div>
    );
};