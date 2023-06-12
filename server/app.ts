import express from "express";
import movieRouter from "./routes/movies";
import tvShowsRouter from "./routes/tv-shows";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use("/movies", movieRouter);
app.use("/tv-shows", tvShowsRouter);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
