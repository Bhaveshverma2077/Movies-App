import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import GenreItem from "../components/GenreItem";

import { Grid, Box, Chip, Skeleton } from "@mui/material";

import store, { RootState } from "../store";
import { fetchGenre as fetchGenresTvShows } from "../store/tv-shows-slice";
import { fetchGenre as fetchGenresMovies } from "../store/movies-slice";

import { othersActions } from "../store/other-slice";

const GenrePage: React.FC = () => {
  const route = useLocation().pathname;
  const navigate = useNavigate();

  const [movieOrTvShow, setMovieOrTvShow] = useState<"movie" | "tvShow">(
    route.startsWith("/movie") ? "movie" : "tvShow"
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
    <>
      <Box className="py-0 sm:py-0 px-0 sm:px-6 lg:px-36">
        <Box className="py-6">
          <Chip
            variant={movieOrTvShow == "movie" ? "filled" : "outlined"}
            clickable
            label="Movies"
            onClick={() => {
              navigate("/movie/genre");
              setMovieOrTvShow("movie");
            }}
          ></Chip>
          <Chip
            variant={movieOrTvShow == "movie" ? "outlined" : "filled"}
            clickable
            label="Tv Shows"
            onClick={() => {
              navigate("/tv-show/genre");
              setMovieOrTvShow("tvShow");
            }}
          ></Chip>
        </Box>

        <Grid container spacing={{ xs: 0, sm: 3 }}>
          {movieOrTvShow == "movie" &&
            genrePageMovies.map((genreIem) => (
              <Grid item key={genreIem.genre.id} lg={3} md={4} sm={6} xs={12}>
                <GenreItem {...genreIem} movieOrTvShow={movieOrTvShow} />
              </Grid>
            ))}
          {movieOrTvShow == "tvShow" &&
            genrePageTvShows.map((genreIem) => (
              <Grid item key={genreIem.genre.id} lg={3} md={4} sm={6} xs={12}>
                <GenreItem {...genreIem} movieOrTvShow={movieOrTvShow} />
              </Grid>
            ))}
          {(genrePageMovies.length == 0 || genrePageTvShows.length == 0) &&
            [...Array(16)].map((index) => (
              <Grid item key={index} lg={3} md={4} sm={6} xs={12}>
                <Skeleton sx={{ transform: "none" }}>
                  <img className="w-full" src="/placeholder.jpg" alt="" />
                </Skeleton>
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
};

export default GenrePage;
