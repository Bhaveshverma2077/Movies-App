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

const setFavorite = (req: Request, res: Response, next: NextFunction) => {
  const operation = req.url.split("/")[2];

  if (!(operation === "add" || operation === "remove")) {
    res.status(404).json({
      message: "operation not available",
    });
    return;
  }

  const favorite = new Favorite({
    mediaId: req.body.mediaId,
    mediaType: req.body.mediaType,
  });

  User.findOneAndUpdate(
    { _id: req.userId },
    operation === "add"
      ? {
          $push: { favoritesMedia: favorite },
        }
      : {
          $pull: {
            favoritesMedia: {
              mediaId: req.body.mediaId,
              mediaType: req.body.mediaType,
            },
          },
        }
  )
    .then((_) => {
      console.log(operation);
      res.status(200).json({
        message: "operation successfull",
      });
    })
    .catch(() => {
      console.log("un");
      res.status(400).json({
        message: "operation successfull failed",
      });
    });
};

export default { getUser, addUser, loginUser, setFavorite };
