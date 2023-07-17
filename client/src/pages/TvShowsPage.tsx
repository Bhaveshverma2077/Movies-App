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
import ScrollableRowTile from "../components/ScrollableRowTile";

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
      (tvShow) => tvShow.id == popularTvShows.tvShows[tvShowHeroIndex]?.id
    )
  );

  useEffect(() => {
    if (
      popularTvShows.page === 0 ||
      topRatedTvShows.page === 0 ||
      onTheAirTvShows.page === 0 ||
      AiringTodayTvShows.page === 0 ||
      onNetflixTvShows.page === 0
    ) {
      store.dispatch(fetchPopular());
      store.dispatch(fetchTopRated());
      store.dispatch(fetchOnTheAir());
      store.dispatch(fetchAiringToday());
      store.dispatch(fetchOnNetflix());
    }
  }, []);

  useEffect(() => {
    if (popularTvShows.tvShows[tvShowHeroIndex]) {
      store.dispatch(
        fetchTvShowDetail(popularTvShows.tvShows[tvShowHeroIndex].id)
      );
    }
  }, [popularTvShows.tvShows[tvShowHeroIndex]]);

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
        {popularTvShows &&
          popularTvShows.tvShows &&
          popularTvShows.tvShows.length != 0 && (
            <ScrollableRow
              title="Popular Tv Shows"
              components={popularTvShows.tvShows.map((data) => (
                <ScrollableRowTile
                  posterOrBackdrop={"BACKDROP"}
                  key={data.id}
                  height={"9rem"}
                  width={"16rem"}
                  tvShow={data}
                ></ScrollableRowTile>
              ))}
              height={"9rem"}
              width={"16rem"}
            />
          )}
        {topRatedTvShows &&
          topRatedTvShows.tvShows &&
          topRatedTvShows.tvShows.length != 0 && (
            <ScrollableRow
              title="Top Rated Tv Shows"
              components={topRatedTvShows.tvShows.map((data) => (
                <ScrollableRowTile
                  posterOrBackdrop={"BACKDROP"}
                  key={data.id}
                  height={"9rem"}
                  width={"16rem"}
                  tvShow={data}
                ></ScrollableRowTile>
              ))}
              height={"9rem"}
              width={"16rem"}
            />
          )}
        {onNetflixTvShows &&
          onNetflixTvShows.tvShows &&
          onNetflixTvShows.tvShows.length != 0 && (
            <ScrollableRow
              title="On Netflix"
              components={onNetflixTvShows.tvShows.map((data) => (
                <ScrollableRowTile
                  posterOrBackdrop={"POSTER"}
                  key={data.id}
                  height={"15rem"}
                  width={"10rem"}
                  tvShow={data}
                ></ScrollableRowTile>
              ))}
              height={"15rem"}
              width={"10rem"}
            />
          )}
        {onTheAirTvShows &&
          onTheAirTvShows.tvShows &&
          onTheAirTvShows.tvShows.length != 0 && (
            <ScrollableRow
              title="On The Air"
              components={onTheAirTvShows.tvShows.map((data) => (
                <ScrollableRowTile
                  posterOrBackdrop={"POSTER"}
                  key={data.id}
                  height={"15rem"}
                  width={"10rem"}
                  tvShow={data}
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

export default TvShowsPage;
