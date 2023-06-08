import { Router } from "express";

const router = Router();

router.route("/").get((req, res, next) => {
  res.status(200).json({ data: "nice" });
});

export default router;
