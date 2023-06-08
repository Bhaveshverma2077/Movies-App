import { Router } from "express";
import moviesController from "../controller/movies";

const router = Router();

router.route("/discover/movies").get(moviesController.getMovies);

router.route("/discover/tv-shows").get(moviesController.getTvShows);

router.route("/find/:id").get(moviesController.getById);

export default router;
