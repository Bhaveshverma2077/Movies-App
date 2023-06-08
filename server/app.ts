import express from "express";
import movieRouter from "./routes/movies";
import dotenv from "dotenv";

const PORT = process.env.PORT || 3000;

dotenv.config();
const app = express();

app.use(movieRouter);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
