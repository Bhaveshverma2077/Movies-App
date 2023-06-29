import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "./movies-slice";
import tvsSlice from "./tv-shows-slice";
import otherSlice from "./other-slice";

const store = configureStore({
  reducer: {
    movies: moviesSlice.reducer,
    tvs: tvsSlice.reducer,
    others: otherSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
