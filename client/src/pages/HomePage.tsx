import { useEffect } from "react";

import { Box } from "@mui/material";
import { useSelector } from "react-redux";

import store, { RootState } from "../store";
import Hero from "../components/Hero";
import TopAppBar from "../components/TopAppBar";
import ScrollableRow from "../components/ScrollableRow";
import { fetchPopular as fetchPopularMovies } from "../store/movies-slice";

import { fetchPopular as fetchPopularTvShows } from "../store/tv-shows-slice";

const HomePage: React.FC = () => {
  useEffect(() => {
    store.dispatch(fetchPopularMovies());
    store.dispatch(fetchPopularTvShows());
  }, []);

  const popularMoviesState = useSelector(
    (state: RootState) => state.movies.popular
  );
  const popularTvShowsState = useSelector(
    (state: RootState) => state.tvs.popular
  );

  return (
    <>
      <Box className="flex flex-col gap-12">
        <Hero
          img="https://image.tmdb.org/t/p/original/foGkPxpw9h8zln81j63mix5B7m8.jpg"
          description="Geralt of Rivia, a mutated monster-hunter for hire, journeys
              toward his destiny in a turbulent world where people often prove
              more wicked than beasts."
        ></Hero>
        <ScrollableRow
          posterOrBackdrop="POSTER"
          title="Featured Movies"
          moviesData={popularMoviesState}
          height={"18rem"}
          width={"12rem"}
        />
        <ScrollableRow
          posterOrBackdrop="POSTER"
          title="Featured Tv Shows"
          tvShowsData={popularTvShowsState}
          height={"18rem"}
          width={"12rem"}
        />
      </Box>
    </>
  );
};

export default HomePage;
