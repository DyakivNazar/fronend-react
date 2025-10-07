import {createAsyncThunk, createSlice, isFulfilled, type PayloadAction} from "@reduxjs/toolkit";
import type {IMovie} from "../../models/IMovie.ts";
import {axiosBD} from "../../services/api.service.ts";
import type {ItmdbBase} from "../../models/ItmdbBase.ts";

type MovieSliceType = {
    movies: IMovie[];
    loadState: boolean;
}

const initialState: MovieSliceType = {movies: [], loadState: false};

const loadMovies = createAsyncThunk<IMovie[]>(
    "movieSlice/loadMovies",
    async (_,thunkAPI) => {
        try{
            const {data: {results}} = await axiosBD.get<ItmdbBase<IMovie[]>>("discover/movie")
            return thunkAPI.fulfillWithValue(results)
        }catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
);

export const movieSlice = createSlice({
    name: 'movieSlice',
    initialState: initialState,
    reducers:{},
    extraReducers: builder =>
        builder
            .addCase(loadMovies.fulfilled, (state, action: PayloadAction<IMovie[]>) => {
                state.movies = action.payload
            })
            .addCase(loadMovies.rejected, (state, action) => {
                console.log(state);
                console.log(action);
            })
            .addMatcher(isFulfilled(loadMovies), (state) => {
                state.loadState = true;
            })
})

export const moviesSliceActions = {
    ...movieSlice.actions, loadMovies
}