import { useEffect } from "react";
import store, { RootState } from "../store";
import {
  fetchAiringToday,
  fetchTvShowDetail,
  fetchPopular,
  fetchTopRated,
  fetchOnTheAir,
  fetchOnNetflix,
} from "../store/tv-shows-slice";
import { useSelector } from "react-redux";
import Hero from "../components/Hero";
import ScrollableRow from "../components/ScrollableRow";
import { Box } from "@mui/material";

const tvShowHeroIndex = 2;

const TvShowsPage: React.FC = () => {
  const popularTvShows = useSelector((state: RootState) => state.tvs.popular);

  const topRatedTvShows = useSelector((state: RootState) => state.tvs.topRated);

  const onTheAirTvShows = useSelector((state: RootState) => state.tvs.onTheAir);

  const AiringTodayTvShows = useSelector(
    (state: RootState) => state.tvs.airingToday
  );

  const onNetflixTvShows = useSelector(
    (state: RootState) => state.tvs.onNetflix
  );

  const tvshowsDetail = useSelector((state: RootState) =>
    state.tvs.detailTvShows.find(
      (tvShow) => tvShow.id == popularTvShows.tvShows[tvShowHeroIndex].id
    )
  );

  useEffect(() => {
    store.dispatch(fetchPopular());
    store.dispatch(fetchTopRated());
    store.dispatch(fetchOnTheAir());
    store.dispatch(fetchAiringToday());

    store.dispatch(fetchOnNetflix());
  }, []);

  useEffect(() => {
    if (popularTvShows.tvShows[tvShowHeroIndex]) {
      store.dispatch(
        fetchTvShowDetail(popularTvShows.tvShows[tvShowHeroIndex].id)
      );
    }
  }, [popularTvShows.tvShows[tvShowHeroIndex]]);

  if (
    !popularTvShows ||
    !topRatedTvShows ||
    !onTheAirTvShows ||
    !AiringTodayTvShows ||
    !tvshowsDetail
  )
    return <></>;

  return (
    <Box className="flex flex-col gap-36 md:gap-12">
      <Hero
        img={
          "https://www.themoviedb.org/t/p/original/tQw4KBjIYsV4bGwJsRVbuN3pJKz.jpg"
        }
        logoImg={"/e9qFk5zrKZaB2IbbOI9N0W77vlh.svg"}
        description={
          "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl."
        }
      />
      <Box className="flex flex-col gap-8">
        <ScrollableRow
          title="Popular Tv Shows"
          width={"16rem"}
          height={"9rem"}
          posterOrBackdrop="BACKDROP"
          tvShowsData={popularTvShows}
        />
        <ScrollableRow
          title="Top Rated Tv Shows"
          width={"16rem"}
          height={"9rem"}
          posterOrBackdrop="BACKDROP"
          tvShowsData={topRatedTvShows}
        />
        <ScrollableRow
          title="On Netflix"
          width={"10rem"}
          height={"15rem"}
          posterOrBackdrop="POSTER"
          tvShowsData={onNetflixTvShows}
        />
        <ScrollableRow
          title="On The Air"
          width={"10rem"}
          height={"15rem"}
          posterOrBackdrop="POSTER"
          tvShowsData={onTheAirTvShows}
        />
      </Box>
    </Box>
  );
};

export default TvShowsPage;
