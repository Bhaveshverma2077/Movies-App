import express from "express";
import movieRouter from "./routes/movies";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(movieRouter);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
