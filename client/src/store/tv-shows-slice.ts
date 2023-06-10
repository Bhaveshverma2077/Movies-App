import { createSlice } from "@reduxjs/toolkit";

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

const tvShowsInitialSate: {
  discover: tvShowsStateType;
  genres: genresType;
  popular: tvShowsStateType;
  detailTvShows: Array<detailedtvShowsType>;
  latest: tvShowsStateType;
  upcomming: tvShowsStateType;
  topRated: tvShowsStateType;
} = {
  latest: { page: 0, tvShows: [] },
  popular: { page: 0, tvShows: [] },
  discover: { page: 0, tvShows: [] },
  detailTvShows: [],
  genres: [],
  upcomming: { page: 0, tvShows: [] },
  topRated: { page: 0, tvShows: [] },
};

const tvShowsSlice = createSlice({
  name: "tvshows",
  initialState: tvShowsInitialSate,
  reducers: {
    in: (state, payload) => {
      return state;
    },
  },
});

const tvShowsActions = tvShowsSlice.actions;

export { tvShowsActions };

export default tvShowsSlice;
