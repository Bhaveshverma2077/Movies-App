import {
  Box,
  Button,
  Grid,
  Link,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import TopAppBar from "../components/TopAppBar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../store";
import { detailedMoviesType, fetchMovieDetail } from "../store/movies-slice";
import ScrollableRow from "../components/ScrollableRow";
import MovieDetailTable from "../components/MovieDetailTable";

const MovieOrTvShowDetilPage: React.FC = () => {
  const id = 603692;
  const movieData = useSelector(
    (state: RootState) => state.movies.detailMovies
  );

  let movie: detailedMoviesType | undefined = movieData.find(
    (movie) => movie.id == id
  );

  console.log(movie);

  useEffect(() => {
    if (!movie) {
      store.dispatch(fetchMovieDetail(id));
    }
  }, []);

  return (
    <>
      <TopAppBar />
      <Grid container>
        <Grid item xs={8}>
          <Box className="flex flex-col h-full justify-center gap-3 pl-[9.3rem] pr-6">
            <Typography className="text-5xl lg:text-6xl" component="h1">
              {movie?.title}
            </Typography>
            <Box className="flex gap-2 items-center">
              <Rating
                name="read-only"
                value={movie?.rating ? movie?.rating / 2 : 0}
                precision={0.25}
                readOnly
              />
              <Typography variant="subtitle2">
                ({movie?.ratingCount})
              </Typography>
            </Box>
            <Typography
              className="text-zinc-400"
              variant="subtitle1"
              component="h2"
            >
              {movie?.overview}
            </Typography>
            <Box className="flex gap-2">
              {movie?.genres.map((genre) => (
                <Button
                  key={genre.id}
                  className="bg-zinc-700 text-zinc-200"
                  size="small"
                  variant="text"
                >
                  <Typography variant="subtitle2" fontWeight="fontWeightBold">
                    {genre.name}
                  </Typography>
                </Button>
              ))}
            </Box>

            <Typography variant="h6">
              {movie?.releaseDate.substring(0, 4)}
            </Typography>

            {movie?.moviesWatchProvider.length === 0 ? (
              <Typography variant="body1">
                Currently Not available for streaming
              </Typography>
            ) : (
              <Box className="flex items-center gap-3">
                {movie?.moviesWatchProvider.map((provider) => (
                  <Box className="w-12">
                    {" "}
                    <img
                      className="w-full"
                      key={provider.providerName}
                      src={`https://image.tmdb.org/t/p/original/Ajqyt5aNxNGjmF9uOfxArGrdf3X.jpg`}
                      alt=""
                    />
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Grid>
        <Grid item xs={4}>
          {" "}
          <img
            className="w-full mb-12"
            src={`https://image.tmdb.org/t/p/w500${movie?.posterPath}`}
            alt=""
          />
        </Grid>
        <Grid item xs={8}>
          <Box className="flex w-[100%] flex-col gap-12 p-6">
            {movie && movie.recommendations && (
              <ScrollableRow
                posterOrBackdrop="BACKDROP"
                title="Recommendations"
                height={"9rem"}
                width={"16rem"}
                moviesData={{ page: 0, movies: movie.recommendations }}
              />
            )}
            {movie && movie.similar && (
              <ScrollableRow
                posterOrBackdrop="POSTER"
                height={"15rem"}
                width={"10rem"}
                title="Similar"
                moviesData={{ page: 0, movies: movie.similar }}
              />
            )}
          </Box>
        </Grid>
        <Grid item xs={4}>
          <MovieDetailTable movie={movie}></MovieDetailTable>
        </Grid>
      </Grid>
    </>
  );
};

export default MovieOrTvShowDetilPage;
