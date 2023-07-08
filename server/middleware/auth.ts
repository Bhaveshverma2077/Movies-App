import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.get("Authorization")?.split(" ")[1];
  if (token) {
    req.isAuthenticated = !!jwt.verify(token, process.env.SECRET_KEY!);
    req.userId = (jwt.verify(token, process.env.SECRET_KEY!) as any).userId;
  } else {
    req.isAuthenticated = false;
  }
  next();
};

export default auth;
