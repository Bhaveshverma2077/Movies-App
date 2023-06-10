import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "./movies-slice";
import tvsSlice from "./tv-shows-slice";

const store = configureStore({
  reducer: { movies: moviesSlice.reducer, tvs: tvsSlice.reducer },
});

export default store;
