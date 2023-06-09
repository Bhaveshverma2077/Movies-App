import { Request, Response, NextFunction } from "express";
import {
  ApiMovieById,
  ApiMovieData,
  ApiTvShowById,
  ApiTvShowData,
} from "../model/util";

const getMovies = (req: Request, res: Response, next: NextFunction) => {
  fetch("https://api.themoviedb.org/3/discover/movie", {
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

const getMovieRecommendationsById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  fetch(`https://api.themoviedb.org/3/movie/${req.params.id}/recommendations`, {
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

export default {
  getMovies,
  getMovieById,
  getSearchMovie,
  getMovieRecommendationsById,
};
