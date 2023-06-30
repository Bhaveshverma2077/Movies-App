import { Request, Response, NextFunction } from "express";
import {
  ApiMovieById,
  ApiMovieData,
  ApiWatchProviderData,
  Movie,
} from "../model/util";

// Helpers

type moviesType = Array<{
  adult: boolean;
  genreIds: number[];
  id: number;
  title: string;
  posterPath: string;
  backdropPath: string;
  overview: string;
  releaseDate: string;
  rating: number;
  ratingCount: number;
}>;

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

const moviesHelper = (route: string, params?: {} | null) => {
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
  let params: {} | null = null;
  if (req.query.page) {
    params = {
      page: req.query.page,
    };
  }
  moviesHelper(`https://api.themoviedb.org/3/discover/movie`, params)
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
    if (genre.name.toLowerCase() === req.params.genre.toLocaleLowerCase()) {
      genreParams = req.query.page
        ? { with_genres: genre.id, page: req.query.page }
        : { with_genres: genre.id };
      return;
    }
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
  let params: {} | null = null;
  if (req.query.page) {
    params = {
      page: req.query.page,
      language: "en-US",
    };
  }
  moviesHelper("https://api.themoviedb.org/3/movie/top_rated", params)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ err: "something went wrong" });
    });
};

const getPopular = (req: Request, res: Response, next: NextFunction) => {
  let params: {} | null = null;
  if (req.query.page) {
    params = {
      page: req.query.page,
      language: "en-US",
    };
  }

  moviesHelper("https://api.themoviedb.org/3/movie/popular", params)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ err: "something went wrong" });
    });
};

const getUpcoming = (req: Request, res: Response, next: NextFunction) => {
  let params: {} | null = null;
  if (req.query.page) {
    params = {
      page: req.query.page,
      language: "en-US",
    };
  }
  moviesHelper("https://api.themoviedb.org/3/movie/upcoming", params)
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
  let params: {} | null = null;
  if (req.query.page) {
    params = {
      page: req.query.page,
      language: "en-US",
    };
  }
  moviesHelper("https://api.themoviedb.org/3/movie/now_playing", params)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ err: "something went wrong" });
    });
};

const getSearchMovie = (req: Request, res: Response, next: NextFunction) => {
  let params = `?query=${req.params.searchString}`;
  if (req.query.page) {
    params = `?query=${req.params.searchString}:page=${req.query.page};`;
  }
  fetch(`https://api.themoviedb.org/3/search/movie${params}`, {
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

      res.status(200).send(outgoingData);
    })
    .catch((err) => {
      res.status(400).json({ err: "something went wrong" });
    });
};

const getMovieById = (req: Request, res: Response, next: NextFunction) => {
  Promise.all([
    fetch(
      `https://api.themoviedb.org/3/movie/${req.params.id}?append_to_response=videos,images`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    ).then((response) => {
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      return response.json();
    }),
    fetch(
      `https://api.themoviedb.org/3/movie/${req.params.id}/watch/providers`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    ).then((res) => res.json()),
    moviesHelper(
      `https://api.themoviedb.org/3/movie/${req.params.id}/recommendations`
    ),
    moviesHelper(`https://api.themoviedb.org/3/movie/${req.params.id}/similar`),
  ])
    .then(
      (body: [ApiMovieById, ApiWatchProviderData, moviesType, moviesType]) => {
        let allProviders: Array<any> = [];

        if (body[1] && body[1].results && body[1].results["US"]) {
          if (body[1].results["US"].flatrate)
            allProviders = [...body[1].results["US"].flatrate];
          if (body[1].results["US"].buy)
            allProviders = [...allProviders, ...body[1].results["US"].buy];
        }

        const watchProviders = allProviders.map((provider) => ({
          logoPath: provider.logo_path,
          providerName: provider.provider_name,
        }));

        const outgoingData = {
          adult: body[0].adult,
          backdropPath: body[0].backdrop_path,
          belongsToCollection: body[0].belongs_to_collection,
          genres: body[0].genres,
          watchProvider: watchProviders.slice(0, 10),
          logoPath: body[0].images.logos[0]?.file_path,
          homepage: body[0].homepage,
          id: body[0].id,
          imdbId: body[0].imdb_id,
          videos: body[0].videos.results,
          overview: body[0].overview,
          posterPath: body[0].poster_path,
          releaseDate: body[0].release_date,
          runtime: body[0].runtime,
          status: body[0].status,
          title: body[0].title,
          rating: body[0].vote_average,
          ratingCount: body[0].vote_count,
          recommendations: body[2],
          similar: body[3],
        };

        res.status(200).send(outgoingData);
      }
    )
    .catch((err) => {
      res.status(400).json({ err: "something went wrong" });
    });
};

const getGenre = (req: Request, res: Response, next: NextFunction) => {
  const genrePromiseList: Array<
    Promise<{
      genre: { id: number; name: string };
      allGenreMovieLists: Array<Movie>;
    }>
  > = [];
  genresList.map((genre) => {
    genrePromiseList.push(
      fetch(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${genre.id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
          },
        }
      )
        .then((res) => res.json())
        .then((body: ApiMovieData) => ({
          genre,
          allGenreMovieLists: body.results,
        }))
    );
  });
  return Promise.all(genrePromiseList).then(
    (
      body: Array<{
        genre: { id: number; name: string };
        allGenreMovieLists: Array<Movie>;
      }>
    ) => {
      const genreList: Array<{
        genre: { id: number; name: string };
        movie: Movie;
      }> = [];
      body.forEach((movieList) => {
        movieList.allGenreMovieLists.every((movie) => {
          let isInFlag = false;
          genreList.every((genreMovie) => {
            if (genreMovie.movie.id === movie.id || !movie.backdrop_path) {
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
      res.status(200).json(
        genreList.map((genreItem) => ({
          genre: genreItem.genre,
          backdrop: genreItem.movie.backdrop_path,
        }))
      );
      return;
    }
  );
};

export default {
  getMovies,
  getPopular,
  getTopRated,
  getMoviesInTheatres,
  getUpcoming,
  getGenre,
  getMovieById,
  getSearchMovie,
  getMoviesWithGenre,
};
