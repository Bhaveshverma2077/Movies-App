import { Box, Button, Grid, Rating, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../store";
import { detailedMoviesType, fetchMovieDetail } from "../store/movies-slice";
import ScrollableRow from "../components/ScrollableRow";
import MovieDetailTable from "../components/MovieDetailTable";
import { useNavigate, useParams } from "react-router-dom";
import LoadingContent from "../components/LoadingContent";
import ScrollableRowTile from "../components/ScrollableRowTile";
import LoadingImagePoster from "../components/LoadingImagePoster";

const MovieOrTvShowDetilPage: React.FC = () => {
  const id = Number(useParams<{ id: string }>()["id"]);

  const navigate = useNavigate();

  const status = useSelector(
    (state: RootState) => state.movies.detailMovieStatus
  );

  const movieData = useSelector(
    (state: RootState) => state.movies.detailMovies
  );

  let movie: detailedMoviesType | undefined = movieData.find(
    (movie) => movie.id == id
  );

  useEffect(() => {
    store.dispatch(fetchMovieDetail(id));
    // setImageLoading(true);
  }, [id]);

  return (
    <Grid container>
      <Grid className="md:hidden" item xs={12}>
        <LoadingImagePoster
          key={id}
          mediaPosterPath={movie?.posterPath}
          status={status}
        ></LoadingImagePoster>
      </Grid>
      <Grid item xs={12} md={8}>
        <Box className="flex flex-col h-full justify-center gap-4 pl-6 lg:pl-36 mt-10 pr-6">
          {status == "LOADING" && <LoadingContent />}
          {status == "NOTLOADING" && (
            <>
              <Typography
                className="text-5xl lg:text-6xl font-bold"
                // variant="subtitle2"
                component="h1"
              >
                {movie?.title}
              </Typography>
              <Box className="flex gap-2 items-center">
                <Rating
                  name="read-only"
                  value={movie?.rating ? movie?.rating / 2 : 0}
                  precision={0.25}
                  readOnly
                />
                <Typography className="text-lg lg:text-xl" component="h3">
                  {movie?.ratingCount}
                </Typography>
              </Box>
              <Typography
                className="text-sm lg:text-base  text-zinc-400"
                variant="subtitle1"
                component="h2"
              >
                {movie?.overview}
              </Typography>
              <Box className="flex gap-2">
                {movie?.genres.map((genre) => (
                  <Button
                    onClick={() => {
                      navigate(`/movie/genre/${genre.name.toLowerCase()}`);
                    }}
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
      <Grid className="hidden md:block" item xs={4}>
        <LoadingImagePoster
          key={id}
          mediaPosterPath={movie?.posterPath}
          status={status}
        ></LoadingImagePoster>
      </Grid>
      <Grid item xs={12} md={8}>
        <Box className="flex w-[100%] mt-16 flex-col gap-12 md:px-6">
          <Box className="flex flex-col justify-center w-full">
            {status == "NOTLOADING" && movie && (
              <ScrollableRow
                title="Videos"
                height={"18rem"}
                width={"32rem"}
                components={movie!.videos.map((video) => (
                  <Box
                    key={video.key}
                    sx={{
                      scrollSnapAlign: "center",
                    }}
                  >
                    <iframe
                      className="border-none w-[100vw] h-[56vw] md:w-[60vw] md:h-[34vw] max-w-[36rem] max-h-[20rem]"
                      src={`https://www.youtube-nocookie.com/embed/${video.key}`}
                      title="YouTube video player"
                      allow="encrypted-media; fullscreen;"
                    ></iframe>
                  </Box>
                ))}
              ></ScrollableRow>
            )}
          </Box>
          {movie &&
            movie.recommendations &&
            movie.recommendations.length != 0 && (
              <ScrollableRow
                title="Recommendations"
                components={movie.recommendations.map((data) => (
                  <ScrollableRowTile
                    posterOrBackdrop={"POSTER"}
                    key={data.id}
                    height={"18rem"}
                    width={"12rem"}
                    movie={data}
                  ></ScrollableRowTile>
                ))}
                height={"18rem"}
                width={"12rem"}
              />
            )}
          {movie && movie.similar && movie.similar.length != 0 && (
            <ScrollableRow
              title="Similar"
              components={movie.similar.map((data) => (
                <ScrollableRowTile
                  posterOrBackdrop={"POSTER"}
                  key={data.id}
                  height={"18rem"}
                  width={"12rem"}
                  movie={data}
                ></ScrollableRowTile>
              ))}
              height={"18rem"}
              width={"12rem"}
            />
          )}
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <MovieDetailTable movie={movie}></MovieDetailTable>
      </Grid>
    </Grid>
  );
};

export default MovieOrTvShowDetilPage;
