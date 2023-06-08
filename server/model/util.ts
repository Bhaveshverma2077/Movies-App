type Movie = {
  adult: boolean;
  genre_ids: Array<number>;
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
};

class ApiMovieData {
  page: number;
  results: Array<Movie>;
  constructor(page: number, results: Array<Movie>) {
    this.page = page;
    this.results = results;
  }
}

type TvShow = {
  adult: boolean;
  genre_ids: Array<number>;
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
};

class ApiTvShowData {
  page: number;
  results: Array<TvShow>;
  constructor(page: number, results: Array<TvShow>) {
    this.page = page;
    this.results = results;
  }
}
type ApiMovieById = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  genres: Array<{ id: number; name: "string" }>;
  homepage: string;
  id: number;
  imdb_id: string;
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  status: string;
  title: string;
  vote_average: number;
  vote_count: number;
};

export { ApiMovieData, ApiTvShowData, ApiMovieById };
