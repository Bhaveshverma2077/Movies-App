import { Router } from "express";
import moviesController from "../controller/movies";
import tvShowsController from "../controller/tvshows";

const router = Router();

//Movies
router.route("/discover/movies").get(moviesController.getMovies);

router.route("/find/movie/:id").get(moviesController.getMovieById);

router
  .route("/search/movie/:searchString")
  .get(moviesController.getSearchMovie);

router
  .route("/recommendations/movies/:id")
  .get(moviesController.getMovieRecommendationsById);

//TvShows
router.route("/discover/tv-shows").get(tvShowsController.getTvShows);

router
  .route("/genres/tv-shows/:genre")
  .get(tvShowsController.getTvShowsWithGenres);

router.route("/genres/movie/:genre").get(moviesController.getMoviesWithGenre);

router.route("/find/tvshow/:id").get(tvShowsController.getTvShowById);

router
  .route("/search/tvshow/:searchString")
  .get(tvShowsController.getSearchTvShow);

router
  .route("/recommendations/tvshows/:id")
  .get(tvShowsController.getTvShowsRecommendationsById);

export default router;
