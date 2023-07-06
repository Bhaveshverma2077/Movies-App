import express from "express";
import userController from "../controller/users";

const router = express.Router();

router.route("/add-user").get(userController.addUser);

router.route("/add-favorite").get(userController.addFavorite);

router.route("/remove-favorite").get(userController.removeFavorite);

export default router;
