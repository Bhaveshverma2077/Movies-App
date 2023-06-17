import {
  Box,
  Button,
  Divider,
  Grid,
  Rating,
  Skeleton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../store";
import { detailedMoviesType, fetchMovieDetail } from "../store/movies-slice";
import ScrollableRow from "../components/ScrollableRow";
import MovieDetailTable from "../components/MovieDetailTable";
import { useParams } from "react-router-dom";
import LoadingContent from "../components/LoadingContent";

let isInitial = 0;

const MovieOrTvShowDetilPage: React.FC = () => {
  const id = Number(useParams<{ id: string }>()["id"]);

  const [isLoading, setIsLoading] = useState(true);

  const movieData = useSelector(
    (state: RootState) => state.movies.detailMovies
  );

  let movie: detailedMoviesType | undefined = movieData.find(
    (movie) => movie.id == id
  );

  //***************************************** */
  // to handle the first two movie.path undefined and then movie.path defined or undefined
  isInitial += 1;

  useEffect(() => {
    setIsLoading(true);
    isInitial = 1;
  }, [id]);

  useEffect(() => {
    if (!movie?.posterPath && isInitial >= 2) {
      setIsLoading(false);
    }
  }, [movie?.id]);

  //************************************* */

  useEffect(() => {
    if (!movie) {
      store.dispatch(fetchMovieDetail(id));
    }
  }, [id]);

  return (
    <>
      <Grid container>
        <Grid item xs={8}>
          <Box className="flex flex-col h-full justify-center gap-3 pl-[9.3rem] pr-6">
            {isLoading && <LoadingContent></LoadingContent>}

            {!isLoading && (
              <>
                {" "}
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
                      <Typography
                        variant="subtitle2"
                        fontWeight="fontWeightBold"
                      >
                        {genre.name}
                      </Typography>
                    </Button>
                  ))}
                </Box>
                <Box className="pt-12"></Box>
                {movie?.moviesWatchProvider.length === 0 ? (
                  <Typography variant="body1">
                    Currently Not available for streaming
                  </Typography>
                ) : (
                  <Box className="flex items-center gap-3">
                    {movie?.moviesWatchProvider.map((provider) => (
                      <Box className="w-12" key={provider.providerName}>
                        {" "}
                        <img
                          className="w-full"
                          src={`https://image.tmdb.org/t/p/original${provider.logoPath}`}
                          alt=""
                        />
                      </Box>
                    ))}
                  </Box>
                )}
                <Typography variant="h6">
                  {movie?.releaseDate.substring(0, 4)}
                </Typography>
              </>
            )}
          </Box>
        </Grid>
        <Grid item xs={4}>
          {movie?.posterPath ? (
            <>
              <img
                className={`w-full mb-12 ${isLoading && "hidden"}`}
                src={`https://image.tmdb.org/t/p/w500${movie?.posterPath}`}
                alt=""
                onLoad={() => {
                  setIsLoading(false);
                }}
              />
              {isLoading && (
                <Box className="w-full mb-12 p-4" sx={{ aspectRatio: "2 / 3" }}>
                  <Skeleton
                    sx={{ transform: "none" }}
                    className="w-full h-full"
                    component={"div"}
                  ></Skeleton>
                </Box>
              )}
            </>
          ) : !isLoading ? (
            <Box
              className={`w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-200`}
            >
              <Typography className="my-auto" variant="subtitle1">
                Preview Not Available
              </Typography>
            </Box>
          ) : (
            <Box className="w-full mb-12 p-6" sx={{ aspectRatio: "2 / 3" }}>
              <Skeleton
                sx={{ transform: "none" }}
                className="w-full h-full"
                component={"div"}
              ></Skeleton>
            </Box>
          )}
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
