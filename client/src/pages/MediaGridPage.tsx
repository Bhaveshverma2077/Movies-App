import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

import MediaTile from "../components/MediaTile";

import { Box, Grid, Skeleton, Typography } from "@mui/material";

import store, { RootState } from "../store";

import { fetchGenreItems as fetchMovieGenreItems } from "../store/movies-slice";

import { moviesType } from "../app-data";

import { fetchGenreItems as fetchTvShowGenreItems } from "../store/tv-shows-slice";

import { moviesGenreList, tvShowsType } from "../app-data";
import { tvShowsGenreList } from "../app-data";
import otherSlice from "../store/other-slice";

const isGenreValid = (genreName: string) => {
  const allGenres = [...moviesGenreList, ...tvShowsGenreList];
  return !!allGenres.find(
    (genre) => genre.name.toLowerCase() === genreName.toLowerCase()
  );
};

let scrollLoading = false;

// to handle infinite scroll
const scrollHandler = (
  isValid: boolean,
  mediaType: "MOVIE" | "TVSHOW",
  genreName: string
) => {
  if (
    Math.floor(document.documentElement.offsetHeight - window.innerHeight) -
      Math.floor(window.scrollY) <
      600 &&
    !scrollLoading
  ) {
    scrollLoading = true;
    fetchData(isValid, mediaType, genreName);
  }
};

const fetchData = (
  isValid: boolean,
  mediaType: "MOVIE" | "TVSHOW",
  genreName: string
) => {
  if (isValid) {
    if (mediaType === "MOVIE") {
      store.dispatch(fetchMovieGenreItems(genreName));
    } else {
      store.dispatch(fetchTvShowGenreItems(genreName));
    }
  }
};

const MediaGridPage: React.FC = () => {
  const routeParams = useParams<{ genreName: string }>();
  const route = useLocation().pathname;
  const mediaType = route.startsWith("/movie") ? "MOVIE" : "TVSHOW";

  const isMovieLoading = useSelector(
    (state: RootState) => state.movies.movieGridLoading
  );

  const isTvShowLoading = useSelector(
    (state: RootState) => state.tvs.tvShowGridLoading
  );

  const isLoading = mediaType == "MOVIE" ? isMovieLoading : isTvShowLoading;

  useEffect(() => {
    const remainingScroll =
      Math.floor(document.documentElement.offsetHeight - window.innerHeight) -
      Math.floor(window.scrollY);
    if (remainingScroll < 150) {
      window.scrollBy({ top: -660 });
    }
    scrollLoading = isLoading == "LOADING";
  }, [isLoading]);

  const movieGenre = useSelector((state: RootState) =>
    state.movies.genres.find(
      (genre) =>
        genre.genreName.toLowerCase() == routeParams.genreName?.toLowerCase()
    )
  );

  const tvShowGenre = useSelector((state: RootState) =>
    state.tvs.genres.find(
      (genre) =>
        genre.genreName.toLowerCase() == routeParams.genreName?.toLowerCase()
    )
  );

  const isValid = isGenreValid(routeParams.genreName!);

  useEffect(() => {
    fetchData(isValid, mediaType, routeParams.genreName!.toLowerCase());
  }, [routeParams.genreName, isValid]);

  const listener = () =>
    scrollHandler(isValid, mediaType, routeParams.genreName!.toLowerCase());

  useEffect(() => {
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, [routeParams.genreName!.toLowerCase()]);

  let media: moviesType[] | tvShowsType[] | undefined;

  if (mediaType == "MOVIE") media = movieGenre?.movies;
  else media = tvShowGenre?.tvShows;

  if (!isValid)
    return (
      <Box className="flex justify-center mt-12">
        <Typography variant="h4" component={"h1"}>
          {`${routeParams.genreName} genre does not exist`}
        </Typography>
      </Box>
    );
  return (
    <Box className="flex flex-col gap-6 py-12 px-8 lg:px-36">
      <Typography className="text-3xl lg:text-5xl" component={"h1"}>
        {mediaType ? movieGenre?.genreName : tvShowGenre?.genreName}
      </Typography>
      <Grid container>
        {media?.map((media) => (
          <Grid key={media.id} item xs={4} md={3} lg={2}>
            <MediaTile
              id={media.id}
              posterPath={media.posterPath}
              mediaType={mediaType}
            />
          </Grid>
        ))}
        {Array.from({ length: 16 }, (_, i) => i).map((index) => (
          <Grid
            className="flex items-center justify-center"
            key={index}
            item
            xs={4}
            md={3}
            lg={2}
          >
            <Skeleton sx={{ transform: "none" }} className="w-[96%] h-[96%]">
              <img className="w-full" src="/placeholderPoster.jpg" alt="" />
            </Skeleton>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MediaGridPage;
