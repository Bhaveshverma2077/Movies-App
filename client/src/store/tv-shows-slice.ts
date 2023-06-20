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
  logoPath: string;
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
  airingToday: tvShowsStateType;
  onTheAir: tvShowsStateType;
  onNetflix: tvShowsStateType;

  topRated: tvShowsStateType;
};

const tvShowsInitialSate: tvShowsInitialSateType = {
  airingToday: { page: 0, tvShows: [] },
  popular: { page: 0, tvShows: [] },
  discover: { page: 0, tvShows: [] },
  onNetflix: { page: 0, tvShows: [] },

  detailTvShows: [],
  genres: [],
  onTheAir: { page: 0, tvShows: [] },
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

const fetchAiringToday = createAsyncThunk<
  Array<tvShowsType>,
  undefined,
  { state: RootState }
>("tvshows/update-airing-today", async (_, thunkApi) => {
  const state = thunkApi.getState();

  return fetch(
    `http://${apiUrl}/tv-shows/airing-today?page=${
      state.tvs.airingToday.page + 1
    }`
  )
    .then((res) => res.json())
    .then((body: Array<tvShowsType>) => body);
});

const fetchOnTheAir = createAsyncThunk<
  Array<tvShowsType>,
  undefined,
  { state: RootState }
>("tvshows/update-on-the-air", async (_, thunkApi) => {
  const state = thunkApi.getState();

  return fetch(
    `http://${apiUrl}/tv-shows/on-the-air?page=${state.tvs.onTheAir.page + 1}`
  )
    .then((res) => res.json())
    .then((body: Array<tvShowsType>) => body);
});

const fetchOnNetflix = createAsyncThunk<
  Array<tvShowsType>,
  undefined,
  { state: RootState }
>("tvshows/update-on-netflix", async (_, thunkApi) => {
  const state = thunkApi.getState();

  return fetch(
    `http://${apiUrl}/tv-shows/on-netflix?page=${state.tvs.onTheAir.page + 1}`
  )
    .then((res) => res.json())
    .then((body: Array<tvShowsType>) => body);
});

const fetchTvShowDetail = createAsyncThunk<
  detailedtvShowsType,
  number,
  { state: RootState }
>("tvshows/update-tv-show-detail", async (id) => {
  console.log(id);

  return fetch(`http://${apiUrl}/tv-shows/find/${id}`)
    .then((res) => {
      return res.json();
    })
    .then((body: detailedtvShowsType) => {
      console.log(body);
      // store.dispatch(fetchRecommendedAndSimilar(id));
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
    builder.addCase(fetchAiringToday.fulfilled, (state, action) => {
      state.airingToday.page += 1;
      state.airingToday.tvShows = [
        ...state.airingToday.tvShows,
        ...action.payload,
      ];
      return state;
    });
    builder.addCase(fetchOnTheAir.fulfilled, (state, action) => {
      state.onTheAir.page += 1;
      state.onTheAir.tvShows = [...state.onTheAir.tvShows, ...action.payload];
      return state;
    });
    builder.addCase(fetchOnNetflix.fulfilled, (state, action) => {
      state.onNetflix.page += 1;
      state.onNetflix.tvShows = [...state.onNetflix.tvShows, ...action.payload];
      return state;
    });
    builder.addCase(fetchTvShowDetail.fulfilled, (state, action) => {
      state.detailTvShows.push(action.payload);
      return state;
    });
  },
});

const tvShowsActions = tvShowsSlice.actions;

export type { tvShowsStateType, tvShowsType };

export {
  tvShowsActions,
  fetchPopular,
  fetchTopRated,
  fetchOnNetflix,
  fetchAiringToday,
  fetchOnTheAir,
  fetchTvShowDetail,
};

export default tvShowsSlice;
