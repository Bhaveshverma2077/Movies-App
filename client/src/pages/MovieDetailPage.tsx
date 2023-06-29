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
import MediaDetail from "../components/MediaDetail";

const MovieOrTvShowDetilPage: React.FC = () => {
  const id = Number(useParams<{ id: string }>()["id"]);

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
  }, [id]);

  return (
    <MediaDetail mediaType="MOVIE" media={movie} status={status}></MediaDetail>
  );
};

export default MovieOrTvShowDetilPage;
