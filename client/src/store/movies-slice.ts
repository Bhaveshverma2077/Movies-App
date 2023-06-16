import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import store, { RootState } from ".";

type genreType = { id: number; name: string };

const apiUrl = "192.168.1.7:9000";

const genresList = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

type moviesType = {
  adult: boolean;
  genreIds: Array<{ id: number; name: string }>;
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
  recommendations: Array<moviesType> | undefined;
  similar: Array<moviesType> | undefined;
  belongsToCollection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  genres: Array<{ id: number; name: "string" }>;
  moviesWatchProvider: Array<{
    logoPath: string;
    providerName: string;
  }>;
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
  genrePageMovies: Array<{ genre: genreType; movie: moviesType }>;
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

const fetchRecommendedAndSimilar = createAsyncThunk<
  {
    movieId: number;
    recommendations: Array<moviesType>;
    similar: Array<moviesType>;
  },
  number,
  { state: RootState }
>("movies/update-recommendations-and-similar", async (id, thunkApi) => {
  const state = thunkApi.getState();

  return Promise.all([
    fetch(
      `http://${apiUrl}/movies/recommendations/${id}?page=${
        state.movies.popular.page + 1
      }`
    ).then((res) => res.json()),
    fetch(
      `http://${apiUrl}/movies/similar/${id}?page=${
        state.movies.popular.page + 1
      }`
    ).then((res) => res.json()),
  ]).then((body: [Array<moviesType>, Array<moviesType>]) => ({
    movieId: id,
    recommendations: body[0],
    similar: body[1],
  }));
});

const fetchMovieDetail = createAsyncThunk<
  detailedMoviesType,
  number,
  { state: RootState }
>("movies/update-movie-watchProvider", async (id, thunkApi) => {
  const state = thunkApi.getState();

  return fetch(`http://${apiUrl}/movies/find/${id}`)
    .then((res) => {
      store.dispatch(fetchRecommendedAndSimilar(id));
      return res.json();
    })
    .then((body: detailedMoviesType) => body);
});

const fetchGenre = createAsyncThunk<
  Array<{ genre: genreType; movie: moviesType }>,
  undefined,
  { state: RootState }
>("movies/update-genre", async (_, thunkApi) => {
  const state = thunkApi.getState();
  const genrePromiseList: Array<
    Promise<{
      genre: genreType;
      allGenreMovieLists: Array<moviesType>;
    }>
  > = [];
  genresList.map((genre) => {
    genrePromiseList.push(
      fetch(`http://${apiUrl}/movies/genres/${genre.name}`)
        .then((res) => res.json())
        .then((body: Array<moviesType>) => {
          console.log(body);
          return { genre, allGenreMovieLists: body };
        })
    );
  });
  return Promise.all(genrePromiseList).then(
    (
      body: Array<{
        genre: { id: number; name: string };
        allGenreMovieLists: Array<moviesType>;
      }>
    ) => {
      const genreList: Array<{
        genre: { id: number; name: string };
        movie: moviesType;
      }> = [];
      body.forEach((movieList) => {
        movieList.allGenreMovieLists.every((movie) => {
          let isInFlag = false;
          genreList.every((genreMovie) => {
            if (genreMovie.movie.id === movie.id) {
              isInFlag = true;
              return false;
            }
            return true;
          });
          if (!isInFlag) {
            genreList.push({ genre: movieList.genre, movie });
            return false;
          }
          return true;
        });
      });
      return genreList;
    }
  );
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
    builder.addCase(fetchGenre.fulfilled, (state, action) => {
      state.genrePageMovies = action.payload;
      return state;
    });
    builder.addCase(fetchMovieDetail.fulfilled, (state, action) => {
      state.detailMovies.push(action.payload);

      return state;
    });
    builder.addCase(fetchRecommendedAndSimilar.fulfilled, (state, action) => {
      const movie = state.detailMovies.find(
        (movie) => movie.id === action.payload.movieId
      );
      movie!.recommendations = action.payload.recommendations;
      movie!.similar = action.payload.similar;
      return state;
    });
  },
});

const moviesActions = moviesSlice.actions;

export type { movieStateType, moviesType, detailedMoviesType };

export {
  genresList,
  moviesActions,
  fetchPopular,
  fetchGenre,
  fetchRecommendedAndSimilar,
  fetchMovieDetail,
};

export default moviesSlice;
