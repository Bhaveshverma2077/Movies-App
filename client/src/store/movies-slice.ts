import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import store, { RootState } from ".";
import { log } from "console";

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
  logoPath: string;
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
  genreName: string;
  id: number;
  page: number;
  movies: Array<moviesType>;
}[];

type moviesInitialSateType = {
  discover: movieStateType;
  genres: genresType;
  popular: movieStateType;
  inTheatres: movieStateType;
  detailMovies: Array<detailedMoviesType>;
  genrePageMovies: Array<{ genre: genreType; movie: moviesType }>;
  latest: movieStateType;
  upcomming: movieStateType;
  topRated: movieStateType;
};

const moviesInitialSate: moviesInitialSateType = {
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
    `http://${apiUrl}/movies/top-rated?page=${state.movies.popular.page + 1}`
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
    `http://${apiUrl}/movies/upcoming?page=${state.movies.popular.page + 1}`
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
    `http://${apiUrl}/movies/in-theatres?page=${state.movies.popular.page + 1}`
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
  ]).then((body: [Array<moviesType>, Array<moviesType>]) => {
    return {
      movieId: id,
      recommendations: body[0],
      similar: body[1],
    };
  });
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
    .then((body: detailedMoviesType) => {
      store.dispatch(fetchRecommendedAndSimilar(id));
      return body;
    });
});

const fetchSearch = createAsyncThunk<
  Array<moviesType>,
  string,
  { state: RootState }
>("movies/update-movie-watchProvider", async (searchString) => {
  return fetch(`http://${apiUrl}/movies/search/${searchString}`)
    .then((res) => {
      return res.json();
    })
    .then((body: Array<moviesType>) => {
      return body;
    });
});

const fetchGenreItems = createAsyncThunk<
  { genre: genreType; data: Array<moviesType> },
  string,
  { state: RootState }
>("movies/update-genre-items", async (genreName) => {
  const genre = genresList.find(
    (genre) => genre.name.toLowerCase() == genreName
  );

  return fetch(`http://${apiUrl}/movies/genres/${genreName}`)
    .then((res) => {
      return res.json();
    })
    .then((body: Array<moviesType>) => {
      console.log({ genreName: genreName, data: body });

      return { genre: genre!, data: body };
    });
});

const fetchGenre = createAsyncThunk<
  Array<{ genre: genreType; movie: moviesType }>,
  undefined,
  { state: RootState }
>("movies/update-genre", async () => {
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
    builder.addCase(fetchMovieDetail.fulfilled, (state, action) => {
      state.detailMovies.push(action.payload);
      return state;
    });
    builder.addCase(fetchGenreItems.fulfilled, (state, action) => {
      const genre = state.genres.find(
        (val) => val.genreName.toLowerCase() == action.payload.genre.name
      );
      if (!genre) {
        state.genres.push({
          genreName: action.payload.genre.name,
          page: 0,
          id: action.payload.genre.id,
          movies: action.payload.data,
        });
        return state;
      }
      genre!.movies = [...genre!.movies, ...action.payload.data];
      return state;
    });
    builder.addCase(fetchRecommendedAndSimilar.fulfilled, (state, action) => {
      const movie = state.detailMovies.find(
        (movie) => movie.id === action.payload.movieId
      );
      movie!.recommendations = [...action.payload.recommendations];
      movie!.similar = [...action.payload.similar];
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
  fetchTopRated,
  fetchUpcoming,
  fetchInTheatres,
  fetchSearch,
  fetchGenreItems,
  fetchGenre,
  fetchRecommendedAndSimilar,
  fetchMovieDetail,
};

export default moviesSlice;
