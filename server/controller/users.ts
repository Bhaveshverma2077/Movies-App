import { Request, Response, NextFunction } from "express";
import User, { Favorite } from "../model/user";

const addUser = (req: Request, res: Response, next: NextFunction) => {
  const user = new User({ name: "nice" });

  user
    .save()
    .then((_) => {
      res.status(200).json({
        message: "account added successfully",
      });
    })
    .catch(() => {
      res.status(400).json({
        message: "failed to create an account",
      });
    });
};

const addFavorite = (req: Request, res: Response, next: NextFunction) => {
  const favorite = new Favorite({ mediaId: 23, mediaType: "MOVIE" });

  User.findOneAndUpdate(
    { _id: "64a59740e0c4a9582a146a22" },
    {
      $push: { favoritesMedia: favorite },
    }
  )
    .then((_) => {
      res.status(200).json({
        message: "add favorite successfully",
      });
    })
    .catch(() => {
      res.status(400).json({
        message: "failed to add favorite",
      });
    });
};

const removeFavorite = (req: Request, res: Response, next: NextFunction) => {
  const favorite = new Favorite({ mediaId: 23, mediaType: "MOVIE" });

  User.findOneAndUpdate(
    { _id: "64a59740e0c4a9582a146a22" },
    {
      $pull: { favoritesMedia: { mediaId: 23, mediaType: "MOVIE" } },
    }
  )
    .then((_) => {
      res.status(200).json({
        message: "favorite removed successfully",
      });
    })
    .catch(() => {
      res.status(400).json({
        message: "failed to remove favorite",
      });
    });
};

export default {
  addUser,
  addFavorite,
  removeFavorite,
};
