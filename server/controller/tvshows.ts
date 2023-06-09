import { Request, Response, NextFunction } from "express";
import { ApiTvShowById, ApiTvShowData } from "../model/util";

const getTvShows = (req: Request, res: Response, next: NextFunction) => {
  fetch("https://api.themoviedb.org/3/discover/tv", {
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
      res.status(200).send(outgoingData);
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
        voteAverage: body.vote_average,
        voteCount: body.vote_count,
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
  getTvShowsRecommendationsById,
};
