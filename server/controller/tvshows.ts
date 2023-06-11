import { Request, Response, NextFunction } from "express";
import { ApiTvShowById, ApiTvShowData } from "../model/util";

const genresList = [
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

const tvShowsHelper = (params?: {}) => {
  let genreParams = "";
  if (params) {
    genreParams = "?" + new URLSearchParams(params).toString();
  }

  return fetch(`https://api.themoviedb.org/3/discover/tv${genreParams}`, {
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
    .then((body: ApiTvShowData) => {
      const data = body.results;
      const outgoingData = data.map((item) => ({
        adult: item.adult,
        genreIds: item.genre_ids,
        id: item.id,
        name: item.name,
        posterPath: item.poster_path,
        backdropPath: item.backdrop_path,
        overview: item.overview,
        firstAirDate: item.first_air_date,
        rating: item.vote_average,
        ratingCount: item.vote_count,
      }));
      return outgoingData;
    });
};

const getTvShows = (req: Request, res: Response, next: NextFunction) => {
  tvShowsHelper()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ err: "something went wrong" });
    });
};

const getTvShowsWithGenres = (
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

  tvShowsHelper(genreParams)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ err: "something went wrong" });
    });
};

const getSearchTvShow = (req: Request, res: Response, next: NextFunction) => {
  fetch(
    `https://api.themoviedb.org/3/search/tv?query=${req.params.searchString}`,
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
    .then((body: ApiTvShowData) => {
      const data = body.results;
      const outgoingData = data.map((item) => ({
        adult: item.adult,
        genreIds: item.genre_ids,
        id: item.id,
        name: item.name,
        posterPath: item.poster_path,
        backdropPath: item.backdrop_path,
        overview: item.overview,
        firstAirDate: item.first_air_date,
        rating: item.vote_average,
        ratingCount: item.vote_count,
      }));
      res.status(200).send(outgoingData);
    })
    .catch((err) => {
      res.status(400).json({ err: "something went wrong" });
    });
};

const getTvShowsRecommendationsById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  fetch(`https://api.themoviedb.org/3/tv/${req.params.id}/recommendations`, {
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
    .then((body: ApiTvShowData) => {
      const data = body.results;
      const outgoingData = data.map((item) => ({
        adult: item.adult,
        genreIds: item.genre_ids,
        id: item.id,
        name: item.name,
        posterPath: item.poster_path,
        backdrop_path: item.backdrop_path,
        overview: item.overview,
        firstAirDate: item.first_air_date,
        rating: item.vote_average,
        ratingCount: item.vote_count,
      }));
      res.status(200).send(outgoingData);
    })
    .catch((err) => {
      res.status(400).json({ err: "something went wrong" });
    });
};

const getTvShowById = (req: Request, res: Response, next: NextFunction) => {
  fetch(`https://api.themoviedb.org/3/tv/${req.params.id}`, {
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
    .then((body: ApiTvShowById) => {
      const outgoingData = {
        adult: body.adult,
        backdropPath: body.backdrop_path,
        genres: body.genres,
        homepage: body.homepage,
        id: body.id,
        overview: body.overview,
        posterPath: body.poster_path,
        status: body.status,
        name: body.name,
        rating: body.vote_average,
        ratingCount: body.vote_count,
        seasons: body.seasons,
        inProduction: body.in_production,
        number_of_episodes: body.number_of_episodes,
        firstAirDate: body.first_air_date,
        lastAirDate: body.last_air_date,
      };
      res.status(200).send(outgoingData);
    })
    .catch((err) => {
      res.status(400).json({ err: "something went wrong" });
    });
};

export default {
  getTvShows,
  getTvShowById,
  getSearchTvShow,
  getTvShowsWithGenres,
  getTvShowsRecommendationsById,
};
