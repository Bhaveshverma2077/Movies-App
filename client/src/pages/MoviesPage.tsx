import { useEffect } from "react";
import { useSelector } from "react-redux";

import { Box } from "@mui/material";

import Hero from "../components/Hero";
import ScrollableRow from "../components/ScrollableRow";

import store, { RootState } from "../store";

import {
  fetchInTheatres,
  fetchMovieDetail,
  fetchPopular,
  fetchTopRated,
  fetchUpcoming,
} from "../store/movies-slice";
import ScrollableRowTile from "../components/ScrollableRowTile";

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
      (movie) => movie.id == popularMovies.movies[0]?.id
    )
  );

  useEffect(() => {
    store.dispatch(fetchPopular());
    store.dispatch(fetchTopRated());
    store.dispatch(fetchUpcoming());
    store.dispatch(fetchInTheatres());
  }, []);

  useEffect(() => {
    if (popularMovies.movies[0]) {
      store.dispatch(fetchMovieDetail(popularMovies.movies[0].id));
    }
  }, [popularMovies.movies[0]]);

  if (
    popularMovies.page == 0 ||
    topRatedMovies.page == 0 ||
    upcomingMovies.page == 0 ||
    inTheatresMovies.page == 0 ||
    !moviesDetail
  )
    return <></>;

  return (
    <Box className="flex flex-col gap-36 md:gap-12">
      <Hero
        img={
          "https://www.themoviedb.org/t/p/original/tfw5LKySp7uEYJ3CUuD4TKx3s8y.jpg"
        }
        logoImg={
          "https://image.tmdb.org/t/p/original/24dIhRKjLnYRanA2Mo0ycZfObUp.png"
        }
        description={moviesDetail.overview}
      />
      <Box className="flex flex-col gap-8">
        {popularMovies &&
          popularMovies.movies &&
          popularMovies.movies.length != 0 && (
            <ScrollableRow
              title="Popular Movies"
              components={popularMovies.movies.map((data) => (
                <ScrollableRowTile
                  posterOrBackdrop={"BACKDROP"}
                  key={data.id}
                  height={"9rem"}
                  width={"16rem"}
                  movie={data}
                ></ScrollableRowTile>
              ))}
              height={"9rem"}
              width={"16rem"}
            />
          )}
        {topRatedMovies &&
          topRatedMovies.movies &&
          topRatedMovies.movies.length != 0 && (
            <ScrollableRow
              title="Top Rated Movies"
              components={topRatedMovies.movies.map((data) => (
                <ScrollableRowTile
                  posterOrBackdrop={"BACKDROP"}
                  key={data.id}
                  height={"9rem"}
                  width={"16rem"}
                  movie={data}
                ></ScrollableRowTile>
              ))}
              height={"9rem"}
              width={"16rem"}
            />
          )}
        {upcomingMovies &&
          upcomingMovies.movies &&
          upcomingMovies.movies.length != 0 && (
            <ScrollableRow
              title="Upcoming Movies"
              components={upcomingMovies.movies.map((data) => (
                <ScrollableRowTile
                  posterOrBackdrop={"POSTER"}
                  key={data.id}
                  height={"15rem"}
                  width={"10rem"}
                  movie={data}
                ></ScrollableRowTile>
              ))}
              height={"15rem"}
              width={"10rem"}
            />
          )}
        {inTheatresMovies &&
          inTheatresMovies.movies &&
          inTheatresMovies.movies.length != 0 && (
            <ScrollableRow
              title="Movies In Theatres"
              components={inTheatresMovies.movies.map((data) => (
                <ScrollableRowTile
                  posterOrBackdrop={"POSTER"}
                  key={data.id}
                  height={"15rem"}
                  width={"10rem"}
                  movie={data}
                ></ScrollableRowTile>
              ))}
              height={"15rem"}
              width={"10rem"}
            />
          )}
      </Box>
    </Box>
  );
};

export default MoviesPage;
