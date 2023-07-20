import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { Favorite } from "../model/user";

const addUser = (
  req: Request<{}, {}, { userName: string; email: string; password: string }>,
  res: Response,
  next: NextFunction
) => {
  const user = new User(req.body);

  user
    .save()
    .then((doc) => {
      const resBody = {
        userId: doc.id,
        userName: req.body.userName,
        email: req.body.email,
        token: jwt.sign({ userId: doc.id }, process.env.SECRET_KEY!),
      };

      res.status(200).json(resBody);
    })
    .catch(() => {
      res.status(400).json({
        message: "failed to create an account",
      });
    });
};

const getUser = (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.userId)
    .then((doc) => {
      const resBody = {
        userId: doc?.id,
        userName: doc?.userName,
        email: doc?.email,
        favorite: doc?.favoritesMedia,
      };

      res.status(200).json(resBody);
    })
    .catch(() => {
      res.status(400).json({
        message: "failed to create an account",
      });
    });
};

const loginUser = (req: Request, res: Response, next: NextFunction) => {
  User.findOne({ email: req.body.email, password: req.body.password })
    .then((doc) => {
      const resBody = {
        userId: doc?.id,
        userName: doc?.userName,
        email: doc?.email,
        token: jwt.sign({ userId: doc?.id }, process.env.SECRET_KEY!),
      };

      res.status(200).json(resBody);
    })
    .catch(() => {
      res.status(400).json({
        message: "failed to create an account",
      });
    });
};

const addFavorite = (req: Request, res: Response, next: NextFunction) => {
  const favorite = new Favorite({
    mediaId: req.body.mediaId,
    mediaType: req.body.mediaType,
  });
  User.findOneAndUpdate(
    { _id: req.userId },
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
  const favorite = {
    mediaId: req.body.mediaId,
    mediaType: req.body.mediaType,
  };

  User.findOneAndUpdate(
    { _id: req.userId },
    {
      $pull: {
        favoritesMedia: {
          mediaId: req.body.mediaId,
          mediaType: req.body.mediaType,
        },
      },
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

export default { getUser, addUser, loginUser, addFavorite, removeFavorite };
