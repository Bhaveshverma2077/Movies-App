import { Router } from "express";
import moviesController from "../controller/movies";

const router = Router();

router.route("/discover").get(moviesController.getMovies);

router.route("/popular").get(moviesController.getPopular);

router.route("/top-rated").get(moviesController.getTopRated);

router.route("/upcoming").get(moviesController.getUpcoming);

router.route("/in-theatres").get(moviesController.getMoviesInTheatres);

router.route("/find/:id").get(moviesController.getMovieById);

router.route("/search/:searchString").get(moviesController.getSearchMovie);

router.route("/genres/:genre").get(moviesController.getMoviesWithGenre);

router.route("/similar/:id").get(moviesController.getSimilarById);

router
  .route("/recommendations/:id")
  .get(moviesController.getMovieRecommendationsById);

export default router;
