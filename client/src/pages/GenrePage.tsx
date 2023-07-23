import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import GenreItem from "../components/GenreItem";

import { Grid, Box, Chip, Skeleton } from "@mui/material";

import store, { RootState } from "../store";
import { fetchGenre as fetchGenresTvShows } from "../store/tv-shows-slice";
import { fetchGenre as fetchGenresMovies } from "../store/movies-slice";
import { othersActions } from "../store/other-slice";

const GenrePage: React.FC = () => {
  const route = useLocation().pathname;

  const [mediaType, setMediaType] = useState<"MOVIE" | "TVSHOW">(
    route.startsWith("/movie") ? "MOVIE" : "TVSHOW"
  );

  const genrePageMovies = useSelector(
    (state: RootState) => state.movies.genrePageMovies
  );

  const genrePageTvShows = useSelector(
    (state: RootState) => state.tvs.genrePageTvShows
  );

  useEffect(() => {
    store.dispatch(fetchGenresMovies());
    store.dispatch(fetchGenresTvShows());
    store.dispatch(othersActions.changeAppBarLoading(true));
  }, []);

  useEffect(() => {
    if (genrePageMovies.length != 0 && genrePageTvShows.length != 0)
      store.dispatch(othersActions.changeAppBarLoading(false));
  }, [genrePageTvShows.length, genrePageMovies.length]);

  return (
    <Box className="py-0 sm:py-0 px-0 sm:px-6 lg:px-36 overflow-hidden">
      {/* Chips */}
      <Box className="mt-6 flex gap-2">
        <Chip
          variant={mediaType == "MOVIE" ? "filled" : "outlined"}
          clickable
          label="Movies"
          onClick={() => {
            window.history.replaceState(null, "Movies Genre", "/movie/genre");
            setMediaType("MOVIE");
          }}
        ></Chip>
        <Chip
          variant={mediaType == "MOVIE" ? "outlined" : "filled"}
          clickable
          label="Tv Shows"
          onClick={() => {
            window.history.replaceState(
              null,
              "Tv Shows Genre",
              "/tv-show/genre"
            );
            setMediaType("TVSHOW");
          }}
        ></Chip>
      </Box>
      {/* Movies */}
      <Grid
        className="transition-transform mt-0"
        container
        spacing={{ xs: 0, sm: 3 }}
        sx={{
          transform: `translateX(${mediaType == "MOVIE" ? "0vw" : "-100vw"})`,
        }}
      >
        {mediaType == "MOVIE" &&
          genrePageMovies.map((genreIem) => (
            <Grid item key={genreIem.genre.id} lg={3} md={4} sm={6} xs={12}>
              <GenreItem {...genreIem} mediaType={mediaType} />
            </Grid>
          ))}
      </Grid>

      {/* Tv Shows */}
      <Grid
        className="transition-transform mt-0 "
        container
        spacing={{ xs: 0, sm: 3 }}
        sx={{
          transform: `translateX(${mediaType == "MOVIE" ? "100vw" : "0vw"})`,
        }}
      >
        {mediaType == "TVSHOW" &&
          genrePageTvShows.map((genreIem) => (
            <Grid item key={genreIem.genre.id} lg={3} md={4} sm={6} xs={12}>
              <GenreItem {...genreIem} mediaType={mediaType} />
            </Grid>
          ))}
      </Grid>

      {/* Skeletons */}
      <Grid className="mt-0" container spacing={{ xs: 0, sm: 3 }}>
        {(genrePageMovies.length == 0 || genrePageTvShows.length == 0) &&
          Array.from({ length: 16 }, (_, i) => i).map((index) => (
            <Grid item key={index} lg={3} md={4} sm={6} xs={12}>
              <Skeleton
                className="w-full aspect-video"
                sx={{ transform: "none" }}
              ></Skeleton>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default GenrePage;
