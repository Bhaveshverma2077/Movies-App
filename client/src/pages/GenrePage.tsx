import TopAppBar from "../components/TopAppBar";
import GenreItem from "../components/GenreItem";
import { Grid, Container, Box, Chip } from "@mui/material";
import { useSelector } from "react-redux";
import store, { RootState } from "../store";
import { useEffect, useState } from "react";
import { fetchGenre as fetchGenresMovies } from "../store/movies-slice";
import { fetchGenre as fetchGenresTvShows } from "../store/tv-shows-slice";
import { useLocation, useNavigate } from "react-router-dom";

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
  }, []);
  console.log(genrePageTvShows);

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
        </Grid>
      </Box>
    </>
  );
};

export default GenrePage;
