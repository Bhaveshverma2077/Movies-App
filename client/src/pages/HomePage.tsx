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
      <TopAppBar />
      <Box className="flex flex-col gap-12">
        <Hero></Hero>
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
