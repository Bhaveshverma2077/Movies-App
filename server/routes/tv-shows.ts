import { Router } from "express";
import tvShowsController from "../controller/tvshows";

const router = Router();

router.route("/discover").get(tvShowsController.getTvShows);

router.route("/popular").get(tvShowsController.getPopular);

router.route("/top-rated").get(tvShowsController.getTopRated);

router.route("/airing-today").get(tvShowsController.getTvShowsAiringToday);

router.route("/on-the-air").get(tvShowsController.getTvShowsOnTheAir);

router.route("/on-netflix").get(tvShowsController.getOnNetflix);

router.route("/find/:id").get(tvShowsController.getTvShowById);

router.route("/search/:searchString").get(tvShowsController.getSearchTvShow);

router.route("/genres").get(tvShowsController.getGenre);

router.route("/genres/:genre").get(tvShowsController.getTvShowsWithGenres);

export default router;
