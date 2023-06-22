import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import {
  Autocomplete,
  Box,
  Chip,
  CircularProgress,
  Grid,
  TextField,
} from "@mui/material";

import OneGenreItem from "../components/OneGenreItem";

import { moviesType } from "../store/movies-slice";
import { tvShowsType } from "../store/tv-shows-slice";

const SearchPage: React.FC = () => {
  const route = useLocation().pathname;
  const routeParams = useParams<{ searchString: string }>();

  const navigate = useNavigate();

  const [searchString, setSearchString] = useState(
    routeParams.searchString ?? ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const [movieOrTvShow, setMovieOrTvShow] = useState<"movie" | "tv-show">(
    route.startsWith("/movie") ? "movie" : "tv-show"
  );
  const [searchMovies, setSearchMovies] = useState<Array<moviesType>>([]);
  const [searchTvShows, setSearchTvShows] = useState<Array<tvShowsType>>([]);

  useEffect(() => {
    let timer = setTimeout(() => {
      navigate(`/${movieOrTvShow}/search/${searchString}`);
      if (searchString == "") {
        return;
      }
      setIsLoading(true);

      fetch(`http://localhost:9000/${movieOrTvShow}s/search/${searchString}`)
        .then((res) => {
          return res.json();
        })
        .then((body: Array<moviesType | tvShowsType>) => {
          if (movieOrTvShow == "movie") {
            setSearchMovies(body as Array<moviesType>);
            setIsLoading(false);
            return;
          }
          setSearchTvShows(body as Array<tvShowsType>);
          setIsLoading(false);
        });
    }, 500);

    return () => {
      window.clearTimeout(timer);
    };
  }, [searchString]);

  return (
    <Box className="flex flex-col w-full items-center gap-12 px-8 lg:px-36">
      <Box className="flex gap-2">
        <Chip
          label="Movies"
          variant={movieOrTvShow == "movie" ? "filled" : "outlined"}
          onClick={() => {
            setMovieOrTvShow("movie");
            setSearchString("");
          }}
          clickable
        />
        <Chip
          label="Tv Shows"
          variant={movieOrTvShow == "movie" ? "outlined" : "filled"}
          onClick={() => {
            setSearchString("");
            setMovieOrTvShow("tv-show");
          }}
          clickable
        />
      </Box>
      <Box className="flex w-full lg:w-[50%]">
        <Autocomplete
          freeSolo
          className="w-full"
          loading={isLoading}
          inputValue={searchString}
          onInputChange={(_, newValue) => {
            return setSearchString(newValue);
          }}
          options={
            movieOrTvShow == "movie"
              ? searchMovies.map((movie) => movie.title)
              : searchTvShows.map((tvShow) => tvShow.name)
          }
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isLoading && <CircularProgress size={20} />}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
              label={movieOrTvShow == "movie" ? "Movie" : "Tv Show"}
            />
          )}
        />
      </Box>

      <Grid container>
        {movieOrTvShow == "movie" &&
          searchMovies.map((movie) => (
            <Grid key={movie.id} item xs={4} md={3} lg={2}>
              <OneGenreItem genre={{}} movie={movie} />
            </Grid>
          ))}
        {movieOrTvShow == "tv-show" &&
          searchTvShows.map((tvShow) => (
            <Grid key={tvShow.id} item xs={4} md={3} lg={2}>
              <OneGenreItem genre={{}} tvShow={tvShow} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default SearchPage;
