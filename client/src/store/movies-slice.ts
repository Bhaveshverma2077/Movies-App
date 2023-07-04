import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from ".";
import { SERVER_URL } from "../settings";
import {
  detailedMoviesType,
  movieGenreType,
  moviesGenreList,
  movieStateType,
  moviesType,
  genreType,
} from "../app-data";

const apiUrl = SERVER_URL;

type moviesInitialSateType = {
  discover: movieStateType;
  genres: movieGenreType;
  popular: movieStateType;
  inTheatres: movieStateType;
  detailMovies: Array<detailedMoviesType>;
  genrePageMovies: Array<{ genre: genreType; backdrop: string }>;
  movieGridLoading: "NOTLOADING" | "LOADING" | "ERROR";
  detailMovieStatus: "NOTLOADING" | "LOADING" | "ERROR";
  latest: movieStateType;
  upcomming: movieStateType;
  topRated: movieStateType;
};

const moviesInitialSate: moviesInitialSateType = {
  detailMovieStatus: "NOTLOADING",
  movieGridLoading: "NOTLOADING",
  latest: { page: 0, movies: [] },
  popular: { page: 0, movies: [] },
  inTheatres: { page: 0, movies: [] },
  discover: { page: 0, movies: [] },
  detailMovies: [],
  genres: [],
  genrePageMovies: [],
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
    `http://${apiUrl}/movies/popular?page=${state.movies.popular.page + 1}`
  )
    .then((res) => res.json())
    .then((body: Array<moviesType>) => body);
});

const fetchTopRated = createAsyncThunk<
  Array<moviesType>,
  undefined,
  { state: RootState }
>("movies/update-top-rated", async (_, thunkApi) => {
  const state = thunkApi.getState();
  return fetch(
    `http://${apiUrl}/movies/top-rated?page=${state.movies.topRated.page + 1}`
  )
    .then((res) => res.json())
    .then((body: Array<moviesType>) => body);
});

const fetchUpcoming = createAsyncThunk<
  Array<moviesType>,
  undefined,
  { state: RootState }
>("movies/update-upcoming", async (_, thunkApi) => {
  const state = thunkApi.getState();
  return fetch(
    `http://${apiUrl}/movies/upcoming?page=${state.movies.upcomming.page + 1}`
  )
    .then((res) => res.json())
    .then((body: Array<moviesType>) => body);
});

const fetchInTheatres = createAsyncThunk<
  Array<moviesType>,
  undefined,
  { state: RootState }
>("movies/update-in-theatres", async (_, thunkApi) => {
  const state = thunkApi.getState();
  return fetch(
    `http://${apiUrl}/movies/in-theatres?page=${
      state.movies.inTheatres.page + 1
    }`
  )
    .then((res) => res.json())
    .then((body: Array<moviesType>) => body);
});

const fetchMovieDetail = createAsyncThunk<
  detailedMoviesType,
  number,
  { state: RootState }
>("movies/update-movie-watchProvider", async (id) => {
  return fetch(`http://${apiUrl}/movies/find/${id}`)
    .then((res) => {
      return res.json();
    })
    .then((body: detailedMoviesType) => body);
});

const fetchGenreItems = createAsyncThunk<
  { genre: genreType; data: Array<moviesType> },
  string,
  { state: RootState }
>("movies/update-genre-items", async (genreName, thunkApi) => {
  const state = thunkApi.getState();

  const genre = moviesGenreList.find(
    (genre) => genre.name.toLowerCase() == genreName
  );

  const page = state.movies.genres.find(
    (gen) => gen.genreName.toLowerCase() == genreName.toLowerCase()
  )?.page;

  return fetch(
    `http://${apiUrl}/movies/genres/${genreName}?page=${page ? page + 1 : 1}`
  )
    .then((res) => {
      return res.json();
    })
    .then((body: Array<moviesType>) => ({ genre: genre!, data: body }));
});

const fetchGenre = createAsyncThunk<
  Array<{ genre: genreType; backdrop: string }>,
  undefined,
  { state: RootState }
>("movies/update-genre", async () => {
  return fetch(`http://${apiUrl}/movies/genres`)
    .then((res) => res.json())
    .then((body: Array<{ genre: genreType; backdrop: string }>) => body);
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
    builder.addCase(fetchTopRated.fulfilled, (state, action) => {
      state.topRated.page += 1;
      state.topRated.movies = [...state.topRated.movies, ...action.payload];
      return state;
    });
    builder.addCase(fetchUpcoming.fulfilled, (state, action) => {
      state.upcomming.page += 1;
      state.upcomming.movies = [...state.upcomming.movies, ...action.payload];
      return state;
    });
    builder.addCase(fetchInTheatres.fulfilled, (state, action) => {
      state.inTheatres.page += 1;
      state.inTheatres.movies = [...state.inTheatres.movies, ...action.payload];
      return state;
    });
    builder.addCase(fetchGenre.fulfilled, (state, action) => {
      state.genrePageMovies = action.payload;
      return state;
    });

    // movie detail
    builder.addCase(fetchMovieDetail.pending, (state, action) => {
      state.detailMovieStatus = "LOADING";
      return state;
    });
    builder.addCase(fetchMovieDetail.rejected, (state, action) => {
      state.detailMovieStatus = "ERROR";
      return state;
    });
    builder.addCase(fetchMovieDetail.fulfilled, (state, action) => {
      state.detailMovieStatus = "NOTLOADING";
      state.detailMovies.push(action.payload);
      return state;
    });
    //.....................

    builder.addCase(fetchGenreItems.pending, (state, action) => {
      state.movieGridLoading = "LOADING";
      return state;
    });
    builder.addCase(fetchGenreItems.fulfilled, (state, action) => {
      state.movieGridLoading = "NOTLOADING";
      const genre = state.genres.find(
        (val) =>
          val.genreName.toLowerCase() == action.payload.genre.name.toLowerCase()
      );

      if (!genre) {
        state.genres.push({
          genreName: action.payload.genre.name,
          page: 1,
          id: action.payload.genre.id,
          movies: action.payload.data,
        });
        return state;
      }
      genre!.movies = [...genre!.movies, ...action.payload.data];
      genre.page += 1;
      return state;
    });
  },
});

const moviesActions = moviesSlice.actions;

export {
  moviesActions,
  fetchPopular,
  fetchTopRated,
  fetchUpcoming,
  fetchInTheatres,
  fetchGenreItems,
  fetchGenre,
  fetchMovieDetail,
};

export default moviesSlice;
