import { useEffect } from "react";
import store, { RootState } from "../store";
import {
  fetchInTheatres,
  fetchMovieDetail,
  fetchPopular,
  fetchTopRated,
  fetchUpcoming,
} from "../store/movies-slice";
import { useSelector } from "react-redux";
import Hero from "../components/Hero";
import ScrollableRow from "../components/ScrollableRow";
import { Box } from "@mui/material";
import { fetchOnNetflix } from "../store/tv-shows-slice";

const MoviesPage: React.FC = () => {
  const popularMovies = useSelector((state: RootState) => state.movies.popular);

  const topRatedMovies = useSelector(
    (state: RootState) => state.movies.topRated
  );

  const upcomingMovies = useSelector(
    (state: RootState) => state.movies.upcomming
  );

  const inTheatresMovies = useSelector(
    (state: RootState) => state.movies.inTheatres
  );

  const moviesDetail = useSelector((state: RootState) =>
    state.movies.detailMovies.find(
      (movie) => movie.id == popularMovies.movies[1].id
    )
  );

  useEffect(() => {
    store.dispatch(fetchPopular());
    store.dispatch(fetchTopRated());
    store.dispatch(fetchUpcoming());
    store.dispatch(fetchInTheatres());
  }, []);

  useEffect(() => {
    if (popularMovies.movies[1]) {
      store.dispatch(fetchMovieDetail(popularMovies.movies[1].id));
    }
  }, [popularMovies.movies[1]]);

  if (
    !popularMovies ||
    !topRatedMovies ||
    !upcomingMovies ||
    !inTheatresMovies ||
    !moviesDetail
  )
    return <></>;

  return (
    <Box className="flex flex-col gap-36 md:gap-12">
      <Hero
        img={
          "https://www.themoviedb.org/t/p/original/tfw5LKySp7uEYJ3CUuD4TKx3s8y.jpg"
        }
        logoImg={moviesDetail.logoPath}
        description={moviesDetail.overview}
      />
      <Box className="flex flex-col gap-8">
        <ScrollableRow
          title="Popular Movies"
          width={"16rem"}
          height={"9rem"}
          posterOrBackdrop="BACKDROP"
          moviesData={popularMovies}
        />
        <ScrollableRow
          title="Top Rated Movies"
          width={"16rem"}
          height={"9rem"}
          posterOrBackdrop="BACKDROP"
          moviesData={topRatedMovies}
        />
        <ScrollableRow
          title="Upcoming Movies"
          width={"10rem"}
          height={"15rem"}
          posterOrBackdrop="POSTER"
          moviesData={upcomingMovies}
        />
        <ScrollableRow
          title="Movies In Theatres"
          width={"10rem"}
          height={"15rem"}
          posterOrBackdrop="POSTER"
          moviesData={inTheatresMovies}
        />
      </Box>
    </Box>
  );
};

export default MoviesPage;
