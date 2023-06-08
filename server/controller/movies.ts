import { Request, Response, NextFunction } from "express";
import { ApiMovieById, ApiMovieData, ApiTvShowData } from "../model/util";

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
        genre_ids: item.genre_ids,
        id: item.id,
        name: item.name,
        poster_path: item.poster_path,
        backdrop_path: item.backdrop_path,
        overview: item.overview,
        first_air_date: item.first_air_date,
        rating: item.vote_average,
        rating_count: item.vote_count,
      }));
      res.status(200).send(outgoingData);
    })
    .catch((err) => {
      res.status(400).json({ err: "something went wrong" });
    });
};

const getById = (req: Request, res: Response, next: NextFunction) => {
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
        backdrop_path: body.backdrop_path,
        belongs_to_collection: body.belongs_to_collection,
        genres: body.genres,
        homepage: body.homepage,
        id: body.id,
        imdb_id: body.imdb_id,
        overview: body.overview,
        poster_path: body.poster_path,
        release_date: body.release_date,
        runtime: body.runtime,
        status: body.status,
        title: body.title,
        vote_average: body.vote_average,
        vote_count: body.vote_count,
      };
      res.status(200).send(outgoingData);
    })
    .catch((err) => {
      res.status(400).json({ err: "something went wrong" });
    });
};

export default { getMovies, getTvShows, getById };
