import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  AsyncThunk,
  BaseThunkAPI,
} from "@reduxjs/toolkit/dist/createAsyncThunk";
import { type } from "os";
import { AppDispatch, RootState } from ".";

type moviesType = {
  adult: boolean;
  genreIds: Array<number>;
  id: number;
  title: string;
  posterPath: string;
  backdropPath: string;
  overview: string;
  releaseDate: string;
  rating: number;
  ratingCount: number;
};

type detailedMoviesType = {
  adult: boolean;
  backdropPath: string;
  belongsToCollection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  genres: Array<{ id: number; name: "string" }>;
  homepage: string;
  id: number;
  imdbId: string;
  overview: string;
  posterPath: string;
  releaseDate: string;
  runtime: number;
  status: string;
  title: string;
  rating: number;
  ratingCount: number;
};

type movieStateType = { page: number; movies: Array<moviesType> };
type genresType = {
  genre: string;
  id: number;
  page: number;
  movies: Array<moviesType>;
}[];

type moviesInitialSateType = {
  discover: movieStateType;
  genres: genresType;
  popular: movieStateType;
  detailMovies: Array<detailedMoviesType>;
  latest: movieStateType;
  upcomming: movieStateType;
  topRated: movieStateType;
};

const moviesInitialSate: moviesInitialSateType = {
  latest: { page: 0, movies: [] },
  popular: { page: 0, movies: [] },
  discover: { page: 0, movies: [] },
  detailMovies: [],
  genres: [],
  upcomming: { page: 0, movies: [] },
  topRated: { page: 0, movies: [] },
};

const fetchPopular = createAsyncThunk<
  Array<moviesType>,
  undefined,
  { state: RootState }
>("movies/update-popular", async (_, thunkApi) => {
  const state = thunkApi.getState();

  return fetch(
    `http://localhost:9000/movies/popular?page=${state.movies.popular.page + 1}`
  )
    .then((res) => res.json())
    .then((body: Array<moviesType>) => body);
});

const moviesSlice = createSlice({
  name: "movies",
  initialState: moviesInitialSate,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPopular.fulfilled, (state, action) => {
      state.popular.page += 1;
      state.popular.movies = [...state.popular.movies, ...action.payload];
      return state;
    });
  },
});

const moviesActions = moviesSlice.actions;

export type { movieStateType, moviesType };

export { moviesActions, fetchPopular };

export default moviesSlice;
