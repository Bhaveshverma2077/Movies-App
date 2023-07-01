import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import {
  detailedtvShowsType,
  genresList,
  tvShowGenreType,
  tvShowsStateType,
  tvShowsType,
} from "../app-data";

type genreType = { id: number; name: string };

const apiUrl = "localhost:9000";

type tvShowsInitialSateType = {
  discover: tvShowsStateType;
  genres: tvShowGenreType;
  popular: tvShowsStateType;
  detailTvShows: Array<detailedtvShowsType>;
  airingToday: tvShowsStateType;
  onTheAir: tvShowsStateType;
  onNetflix: tvShowsStateType;
  genrePageTvShows: Array<{ genre: genreType; backdrop: string }>;
  detailTvShowStatus: "NOTLOADING" | "LOADING" | "ERROR";
  topRated: tvShowsStateType;
};

const tvShowsInitialSate: tvShowsInitialSateType = {
  detailTvShowStatus: "NOTLOADING",
  airingToday: { page: 0, tvShows: [] },
  popular: { page: 0, tvShows: [] },
  discover: { page: 0, tvShows: [] },
  onNetflix: { page: 0, tvShows: [] },
  genrePageTvShows: [],
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
  const state = thunkApi.getState();
  return fetch(
    `http://${apiUrl}/tv-shows/popular?page=${state.tvs.popular.page + 1}`
  )
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
  const state = thunkApi.getState();
  return fetch(
    `http://${apiUrl}/tv-shows/top-rated?page=${state.tvs.topRated.page + 1}`
  )
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
    `http://${apiUrl}/tv-shows/on-netflix?page=${state.tvs.onNetflix.page + 1}`
  )
    .then((res) => res.json())
    .then((body: Array<tvShowsType>) => body);
});

const fetchTvShowDetail = createAsyncThunk<
  detailedtvShowsType,
  number,
  { state: RootState }
>("tvshows/update-tv-show-detail", async (id) => {
  return fetch(`http://${apiUrl}/tv-shows/find/${id}`)
    .then((res) => {
      return res.json();
    })
    .then((body: detailedtvShowsType) => {
      return body;
    });
});

const fetchGenreItems = createAsyncThunk<
  { genre: genreType; data: Array<tvShowsType> },
  string,
  { state: RootState }
>("tvshows/update-genre-items", async (genreName) => {
  const genre = genresList.find(
    (genre) => genre.name.toLowerCase() == genreName
  );

  return fetch(`http://${apiUrl}/tv-shows/genres/${genreName}`)
    .then((res) => {
      return res.json();
    })
    .then((body: Array<tvShowsType>) => {
      console.log({ genreName: genreName, data: body });

      return { genre: genre!, data: body };
    });
});

const fetchGenre = createAsyncThunk<
  Array<{ genre: genreType; backdrop: string }>,
  undefined,
  { state: RootState }
>("tvshows/update-genre", async () => {
  return fetch(`http://${apiUrl}/tv-shows/genres`)
    .then((res) => res.json())
    .then((body: Array<{ genre: genreType; backdrop: string }>) => {
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
    builder.addCase(fetchTvShowDetail.pending, (state, action) => {
      state.detailTvShowStatus = "LOADING";
      return state;
    });
    builder.addCase(fetchTvShowDetail.rejected, (state, action) => {
      state.detailTvShowStatus = "ERROR";
      return state;
    });
    builder.addCase(fetchTvShowDetail.fulfilled, (state, action) => {
      state.detailTvShows.push(action.payload);
      state.detailTvShowStatus = "NOTLOADING";
      return state;
    });
    builder.addCase(fetchGenre.fulfilled, (state, action) => {
      state.genrePageTvShows = action.payload;
      return state;
    });

    builder.addCase(fetchGenreItems.fulfilled, (state, action) => {
      const genre = state.genres.find(
        (val) => val.genreName.toLowerCase() == action.payload.genre.name
      );
      if (!genre) {
        state.genres.push({
          genreName: action.payload.genre.name,
          page: 0,
          id: action.payload.genre.id,
          tvShows: action.payload.data,
        });
        return state;
      }
      genre!.tvShows = [...genre!.tvShows, ...action.payload.data];
      return state;
    });
  },
});

const tvShowsActions = tvShowsSlice.actions;

export {
  genresList,
  tvShowsActions,
  fetchPopular,
  fetchGenre,
  fetchTopRated,
  fetchOnNetflix,
  fetchGenreItems,
  fetchAiringToday,
  fetchOnTheAir,
  fetchTvShowDetail,
};

export default tvShowsSlice;
