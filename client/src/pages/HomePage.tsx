import { useEffect } from "react";
import { useSelector } from "react-redux";

import { Box } from "@mui/material";

import Hero from "../components/Hero";
import ScrollableRow from "../components/ScrollableRow";

import store, { RootState } from "../store";

import { fetchPopular as fetchPopularMovies } from "../store/movies-slice";
import { fetchPopular as fetchPopularTvShows } from "../store/tv-shows-slice";
import ScrollableRowTile from "../components/ScrollableRowTile";

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
          img="/foGkPxpw9h8zln81j63mix5B7m8.jpg"
          logoImg="/x3uBgefbFC8blsE4Sbdi0m2a71d.png"
          description="Geralt of Rivia, a mutated monster-hunter for hire, journeys
              toward his destiny in a turbulent world where people often prove
              more wicked than beasts."
        ></Hero>
        {popularMoviesState && popularMoviesState.movies.length != 0 && (
          <ScrollableRow
            title="Featured Tv Shows"
            components={popularMoviesState.movies.map((data) => (
              <ScrollableRowTile
                posterOrBackdrop={"POSTER"}
                key={data.id}
                height={"18rem"}
                width={"12rem"}
                movie={data}
              ></ScrollableRowTile>
            ))}
            height={"18rem"}
            width={"12rem"}
          />
        )}
        {popularTvShowsState && popularTvShowsState.tvShows.length != 0 && (
          <ScrollableRow
            title="Featured Tv Shows"
            components={popularTvShowsState.tvShows.map((data) => (
              <ScrollableRowTile
                posterOrBackdrop={"POSTER"}
                key={data.id}
                height={"18rem"}
                width={"12rem"}
                tvShow={data}
              ></ScrollableRowTile>
            ))}
            height={"18rem"}
            width={"12rem"}
          />
        )}
        <ScrollableRow
          title="nice"
          height={"18rem"}
          width={"32rem"}
          components={[
            <Box className="w-full">
              <iframe
                className="border-none"
                width="560"
                height="315"
                src={`https://www.youtube-nocookie.com/embed/yjRHZEUamCc`}
                title="YouTube video player"
                allow="encrypted-media; fullscreen;"
              ></iframe>
            </Box>,
            <iframe
              className="border-none"
              width="560"
              height="315"
              src={`https://www.youtube-nocookie.com/embed/yjRHZEUamCc`}
              title="YouTube video player"
              allow="encrypted-media; fullscreen;"
            ></iframe>,
            <iframe
              className="border-none"
              width="560"
              height="315"
              src={`https://www.youtube-nocookie.com/embed/yjRHZEUamCc`}
              title="YouTube video player"
              allow="encrypted-media; fullscreen;"
            ></iframe>,
            <iframe
              className="border-none"
              width="560"
              height="315"
              src={`https://www.youtube-nocookie.com/embed/yjRHZEUamCc`}
              title="YouTube video player"
              allow="encrypted-media; fullscreen;"
            ></iframe>,
            <iframe
              className="border-none"
              width="560"
              height="315"
              src={`https://www.youtube-nocookie.com/embed/yjRHZEUamCc`}
              title="YouTube video player"
              allow="encrypted-media; fullscreen;"
            ></iframe>,
            <iframe
              className="border-none"
              width="560"
              height="315"
              src={`https://www.youtube-nocookie.com/embed/yjRHZEUamCc`}
              title="YouTube video player"
              allow="encrypted-media; fullscreen;"
            ></iframe>,
            <iframe
              className="border-none"
              width="560"
              height="315"
              src={`https://www.youtube-nocookie.com/embed/yjRHZEUamCc`}
              title="YouTube video player"
              allow="encrypted-media; fullscreen;"
            ></iframe>,
            <iframe
              className="border-none"
              width="560"
              height="315"
              src={`https://www.youtube-nocookie.com/embed/yjRHZEUamCc`}
              title="YouTube video player"
              allow="encrypted-media; fullscreen;"
            ></iframe>,
          ]}
        ></ScrollableRow>
      </Box>
    </>
  );
};

export default HomePage;
