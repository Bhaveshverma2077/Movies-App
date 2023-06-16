import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { type } from "os";
import { RootState } from ".";

const apiUrl = "192.168.1.7:9000";

type detailedtvShowsType = {
  adult: boolean;
  backdropPath: string;
  genres: Array<{ id: number; name: "string" }>;
  homepage: string;
  id: number;
  overview: string;
  posterPath: string;
  firstAirDate: string;
  lastAirDate: string;
  numberOfEpisodes: number;
  status: string;
  seasons: Array<{
    season_number: number;
    episode_count: number;
    id: number;
    name: string;
    poster_path: string;
  }>;
  name: string;
  rating: number;
  ratingCount: number;
};

type tvShowsType = {
  adult: boolean;
  genreIds: Array<number>;
  id: number;
  name: string;
  posterPath: string;
  backdropPath: string;
  overview: string;
  firstAirDate: string;
  rating: number;
  ratingCount: number;
};

type tvShowsStateType = { page: number; tvShows: Array<tvShowsType> };
type genresType = {
  genre: string;
  id: number;
  page: number;
  tvShows: Array<tvShowsType>;
}[];

type tvShowsInitialSateType = {
  discover: tvShowsStateType;
  genres: genresType;
  popular: tvShowsStateType;
  detailTvShows: Array<detailedtvShowsType>;
  latest: tvShowsStateType;
  upcomming: tvShowsStateType;
  topRated: tvShowsStateType;
};

const tvShowsInitialSate: tvShowsInitialSateType = {
  latest: { page: 0, tvShows: [] },
  popular: { page: 0, tvShows: [] },
  discover: { page: 0, tvShows: [] },
  detailTvShows: [],
  genres: [],
  upcomming: { page: 0, tvShows: [] },
  topRated: { page: 0, tvShows: [] },
};

const fetchPopular = createAsyncThunk<
  Array<tvShowsType>,
  undefined,
  { state: RootState }
>("tvshows/update-popular", async (_, thunkApi) => {
  return fetch(`http://${apiUrl}/tv-shows/popular`)
    .then((res) => res.json())
    .then((body) => {
      return body;
    });
});

const fetchTopRated = createAsyncThunk<
  Array<tvShowsType>,
  undefined,
  { state: RootState }
>("tvshows/update-top-rated", async (_, thunkApi) => {
  return fetch(`http://${apiUrl}/tv-shows/top-rated`)
    .then((res) => res.json())
    .then((body) => {
      return body;
    });
});

const tvShowsSlice = createSlice({
  name: "tvshows",
  initialState: tvShowsInitialSate,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPopular.fulfilled, (state, action) => {
      state.popular.page += 1;
      state.popular.tvShows = [...state.popular.tvShows, ...action.payload];
      return state;
    });
    builder.addCase(fetchTopRated.fulfilled, (state, action) => {
      state.topRated.page += 1;
      state.topRated.tvShows = [...state.topRated.tvShows, ...action.payload];
      return state;
    });
  },
});

const tvShowsActions = tvShowsSlice.actions;

export type { tvShowsStateType, tvShowsType };

export { tvShowsActions, fetchPopular };

export default tvShowsSlice;
