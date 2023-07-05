export const moviesGenreList = [
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

export const tvShowsGenreList = [
  {
    id: 10759,
    name: "Action & Adventure",
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
    id: 10762,
    name: "Kids",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10763,
    name: "News",
  },
  {
    id: 10764,
    name: "Reality",
  },
  {
    id: 10765,
    name: "Sci-Fi & Fantasy",
  },
  {
    id: 10766,
    name: "Soap",
  },
  {
    id: 10767,
    name: "Talk",
  },
  {
    id: 10768,
    name: "War & Politics",
  },
  {
    id: 37,
    name: "Western",
  },
];

export type genreType = { id: number; name: string };

// Movies

export type moviesType = {
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

export type detailedMoviesType = {
  adult: boolean;
  backdropPath: string;
  recommendations: Array<moviesType> | undefined;
  similar: Array<moviesType> | undefined;
  videos: Array<{ name: string; key: string }>;
  belongsToCollection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  genres: Array<{ id: number; name: "string" }>;
  logoPath: string;
  watchProvider: Array<{
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

export type movieStateType = { page: number; movies: Array<moviesType> };

export type movieGenreType = {
  genreName: string;
  id: number;
  page: number;
  movies: Array<moviesType>;
}[];

// Tv Shows

export type detailedtvShowsType = {
  adult: boolean;
  backdropPath: string;
  genres: Array<{ id: number; name: "string" }>;
  homepage: string;
  id: number;
  overview: string;
  logoPath: string;
  posterPath: string;
  videos: Array<{ name: string; key: string }>;
  watchProvider: Array<{
    logoPath: string;
    providerName: string;
  }>;
  firstAirDate: string;
  lastAirDate: string;
  recommendations: Array<tvShowsType> | undefined;
  similar: Array<tvShowsType> | undefined;
  numberOfEpisodes: number;
  status: string;
  seasons: Array<{
    season_number: number;
    episode_count: number;
    id: number;
    name: string;
    poster_path: string;
  }>;
  name: string;
  rating: number;
  ratingCount: number;
};

export type tvShowsType = {
  adult: boolean;
  genreIds: Array<number>;
  id: number;
  name: string;
  posterPath: string;
  backdropPath: string;
  overview: string;
  firstAirDate: string;
  rating: number;
  ratingCountexport: number;
};

export type tvShowsStateType = { page: number; tvShows: Array<tvShowsType> };
export type tvShowGenreType = {
  genreName: string;
  id: number;
  page: number;
  tvShows: Array<tvShowsType>;
}[];
