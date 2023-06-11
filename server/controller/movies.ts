import { Request, Response, NextFunction } from "express";
import { ApiMovieById, ApiMovieData } from "../model/util";

// Helpers

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

const moviesHelper = (route: string, params?: {}) => {
  let genreParams = "";

  if (params) {
    genreParams = "?" + new URLSearchParams(params).toString();
  }

  return fetch(`${route}${genreParams}`, {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      return response.json();
    })
    .then((body: ApiMovieData) => {
      const data = body.results;
      const outgoingData = data.map((item) => ({
        adult: item.adult,
        genreIds: item.genre_ids,
        id: item.id,
        title: item.title,
        posterPath: item.poster_path,
        backdropPath: item.backdrop_path,
        overview: item.overview,
        releaseDate: item.release_date,
        rating: item.vote_average,
        ratingCount: item.vote_count,
      }));
      return outgoingData;
    });
};

// Controllers

const getMovies = (req: Request, res: Response, next: NextFunction) => {
  moviesHelper("https://api.themoviedb.org/3/discover/movie")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ err: "something went wrong" });
    });
};

const getMoviesWithGenre = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let genreParams: {} | undefined;

  genresList.forEach((genre) => {
    if (genre.name.toLowerCase() === req.params.genre.toLocaleLowerCase())
      genreParams = { with_genres: genre.id };
    return;
  });

  if (!genreParams) {
    res.status(400).json({ err: "invalid genre" });
    return;
  }

  moviesHelper("https://api.themoviedb.org/3/discover/movie", genreParams)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ err: "something went wrong" });
    });
};

const getTopRated = (req: Request, res: Response, next: NextFunction) => {
  moviesHelper("https://api.themoviedb.org/3/movie/top_rated")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ err: "something went wrong" });
    });
};

const getPopular = (req: Request, res: Response, next: NextFunction) => {
  moviesHelper("https://api.themoviedb.org/3/movie/popular")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ err: "something went wrong" });
    });
};

const getUpcoming = (req: Request, res: Response, next: NextFunction) => {
  moviesHelper("https://api.themoviedb.org/3/movie/upcoming")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ err: "something went wrong" });
    });
};

const getMoviesInTheatres = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  moviesHelper("https://api.themoviedb.org/3/movie/now_playing")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ err: "something went wrong" });
    });
};

const getSearchMovie = (req: Request, res: Response, next: NextFunction) => {
  fetch(
    `https://api.themoviedb.org/3/search/movie?query=${req.params.searchString}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      return response.json();
    })
    .then((body: ApiMovieData) => {
      const data = body.results;
      const outgoingData = data.map((item) => ({
        adult: item.adult,
        genreIds: item.genre_ids,
        id: item.id,
        title: item.title,
        posterPath: item.poster_path,
        backdropPath: item.backdrop_path,
        overview: item.overview,
        releaseDate: item.release_date,
        rating: item.vote_average,
        ratingCount: item.vote_count,
      }));

      res.status(200).send(outgoingData);
    })
    .catch((err) => {
      res.status(400).json({ err: "something went wrong" });
    });
};

const getMovieById = (req: Request, res: Response, next: NextFunction) => {
  fetch(`https://api.themoviedb.org/3/movie/${req.params.id}`, {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      return response.json();
    })
    .then((body: ApiMovieById) => {
      const outgoingData = {
        adult: body.adult,
        backdropPath: body.backdrop_path,
        belongsToCollection: body.belongs_to_collection,
        genres: body.genres,
        homepage: body.homepage,
        id: body.id,
        imdbId: body.imdb_id,
        overview: body.overview,
        posterPath: body.poster_path,
        releaseDate: body.release_date,
        runtime: body.runtime,
        status: body.status,
        title: body.title,
        rating: body.vote_average,
        ratingCount: body.vote_count,
      };
      res.status(200).send(outgoingData);
    })
    .catch((err) => {
      res.status(400).json({ err: "something went wrong" });
    });
};

const getSimilarById = (req: Request, res: Response, next: NextFunction) => {
  moviesHelper(`https://api.themoviedb.org/3/movie/${req.params.id}/similar`)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ err: "something went wrong" });
    });
};

const getMovieRecommendationsById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  moviesHelper(
    `https://api.themoviedb.org/3/movie/${req.params.id}/recommendations`
  )
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ err: "something went wrong" });
    });
};

export default {
  getMovies,
  getPopular,
  getTopRated,
  getMoviesInTheatres,
  getUpcoming,
  getMovieById,
  getSearchMovie,
  getMoviesWithGenre,
  getSimilarById,
  getMovieRecommendationsById,
};
