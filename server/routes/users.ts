import express from "express";
import userController from "../controller/users";

const router = express.Router();

router.route("/add-user").post(userController.addUser);

router.route("/set-user").post(userController.getUser);

router.route("/login-user").post(userController.loginUser);

router.route("/set-favorite/add").post(userController.setFavorite);

router.route("/set-favorite/remove").post(userController.setFavorite);

export default router;
