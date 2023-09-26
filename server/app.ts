import express from "express";
import { connect } from "mongoose";
import moviesRouter from "./routes/movies";
import usersRouter from "./routes/users";
import tvShowsRouter from "./routes/tv-shows";
import dotenv from "dotenv";
import cors from "cors";
import auth from "./middleware/auth";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(auth);

app.use("/users", usersRouter);
app.use("/movies", moviesRouter);
app.use("/tv-shows", tvShowsRouter);

app.route("/*").all((req, res, next) => {
  res.status(404).json({ message: "requested resource not found" });
});

connect(process.env.DATABASE_URL!).then(() => {
  app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
  });
});
