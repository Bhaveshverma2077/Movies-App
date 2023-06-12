import { Box } from "@mui/material";
import ScrollableRow from "../components/ScrollableRow";
import TopAppBar from "../components/TopAppBar";
import { useSelector } from "react-redux";
import store, { RootState } from "../store";
import { useEffect } from "react";
import { fetchPopular as fetchPopularTvShows } from "../store/tv-shows-slice";
import { fetchPopular as fetchPopularMovies } from "../store/movies-slice";

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
    <Box className="flex flex-col gap-12">
      <TopAppBar />
      <ScrollableRow
        title="Featured Movies"
        moviesData={popularMoviesState}
        height={"21rem"}
        width={"14rem"}
      />
      <ScrollableRow
        title="Featured Tv Shows"
        tvShowsData={popularTvShowsState}
        height={"21rem"}
        width={"14rem"}
      />
    </Box>
  );
};

export default HomePage;
