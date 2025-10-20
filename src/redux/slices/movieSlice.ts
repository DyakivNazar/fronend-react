import {createAsyncThunk, createSlice, isFulfilled, type PayloadAction} from "@reduxjs/toolkit";
import type {IMovie} from "../../models/IMovie.ts";
import {axiosBD} from "../../services/api.service.ts";
import type {ItmdbBase} from "../../models/ItmdbBase.ts";
import type {IGenre} from "../../models/IGenre.ts";
import type {IMovieInfo} from "../../models/IMovieInfo.ts";

type MovieSliceType = {
    movies: IMovie[];
    movieInfo: IMovieInfo | null;
    genres: IGenre[];
    loadState: boolean;
    page: number;
    totalPages: number;
}

const initialState: MovieSliceType = {
    movies: [],
    movieInfo: null,
    genres: [],
    loadState: false,
    page: 1,
    totalPages: 1,
};

const loadMovies = createAsyncThunk(
    "movieSlice/loadMovies",
    async ({genreId, page}: { genreId?: number; page?: string } = {}, thunkAPI) => {
        try {
            const params = {
                with_genres: genreId ?? undefined,
                page,
            };

            const {data} = await axiosBD.get<ItmdbBase<IMovie[]>>("discover/movie", {params})
            return thunkAPI.fulfillWithValue(data)
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
);

const loadGenres = createAsyncThunk(
    "movieSlice/loadGenres",
    async (_, thunkAPI) => {
        try {
            const {data: {genres}} = await axiosBD.get<{ genres: IGenre[] }>("genre/movie/list")
            return thunkAPI.fulfillWithValue(genres)
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

const loadMovieInfo = createAsyncThunk(
    "movieSlice/loadMovieInfo",
    async (id: string, thunkAPI) => {
        try {
            const {data} = await axiosBD.get<IMovieInfo>("movie/" + id)
            return thunkAPI.fulfillWithValue(data)
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
);

const searchMovies = createAsyncThunk(
    "movieSlice/searchMovies",
    async ({query, page}: { query?: string; page?: string } = {}, thunkAPI) => {
        try {
            const params = {
                query,
                page

            }
            const {data} = await axiosBD.get<ItmdbBase<IMovie[]>>("search/movie", {params});
            return thunkAPI.fulfillWithValue(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const movieSlice = createSlice({
    name: 'movieSlice',
    initialState: initialState,
    reducers: {
        clearMovieInfo: (state) => {
            state.movieInfo = null;
        },
    },
    extraReducers: builder =>
        builder
            .addCase(loadMovies.fulfilled, (state, action: PayloadAction<ItmdbBase<IMovie[]>>) => {
                state.movies = action.payload.results;
                state.page = action.payload.page;
                state.totalPages = action.payload.total_pages;
            })
            .addCase(loadGenres.fulfilled, (state, action: PayloadAction<IGenre[]>) => {
                state.genres = action.payload
            })
            .addCase(loadMovieInfo.fulfilled, (state, action: PayloadAction<IMovieInfo>) => {
                state.movieInfo = action.payload
            })
            .addCase(searchMovies.fulfilled, (state, action: PayloadAction<ItmdbBase<IMovie[]>>) => {
                state.movies = action.payload.results;
                state.page = action.payload.page;
                state.totalPages = action.payload.total_pages;
            })
            .addMatcher(isFulfilled(loadMovies, loadGenres, loadMovieInfo, searchMovies), (state) => {
                state.loadState = true;
            })

})

export const moviesSliceActions = {
    ...movieSlice.actions, loadMovies, loadGenres, loadMovieInfo, searchMovies
}