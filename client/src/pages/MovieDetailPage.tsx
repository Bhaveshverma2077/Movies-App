import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import MediaDetail from "../components/MediaDetail";

import store, { RootState } from "../store";

import { fetchMovieDetail } from "../store/movies-slice";

import { detailedMoviesType } from "../app-data";

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
