import { createSlice } from "@reduxjs/toolkit";

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

const moviesInitialSate: {
  discover: movieStateType;
  genres: genresType;
  popular: movieStateType;
  detailMovies: Array<detailedMoviesType>;
  latest: movieStateType;
  upcomming: movieStateType;
  topRated: movieStateType;
} = {
  latest: { page: 0, movies: [] },
  popular: { page: 0, movies: [] },
  discover: { page: 0, movies: [] },
  detailMovies: [],
  genres: [],
  upcomming: { page: 0, movies: [] },
  topRated: { page: 0, movies: [] },
};

const moviesSlice = createSlice({
  name: "movies",
  initialState: moviesInitialSate,
  reducers: {
    updateLatest: (state, payload) => {
      return state;
    },
  },
});

const moviesActions = moviesSlice.actions;

export { moviesActions };

export default moviesSlice;
