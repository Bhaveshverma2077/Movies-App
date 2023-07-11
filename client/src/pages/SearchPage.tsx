import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import {
  Autocomplete,
  Box,
  Chip,
  CircularProgress,
  Grid,
  TextField,
} from "@mui/material";

import MediaTile from "../components/MediaTile";

import store from "../store";

import { othersActions } from "../store/other-slice";

import { SERVER_URL } from "../settings";
import { tvShowsType } from "../app-data";
import { moviesType } from "../app-data";

const SearchPage: React.FC = () => {
  const route = useLocation().pathname;
  const routeParams = useParams<{ searchString: string }>();

  const navigate = useNavigate();

  const [searchString, setSearchString] = useState(
    routeParams.searchString ?? ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const [mediaType, setMediaType] = useState<"MOVIE" | "TVSHOW">(
    route.startsWith("/movie") ? "MOVIE" : "TVSHOW"
  );
  const [searchMovies, setSearchMovies] = useState<Array<moviesType>>([]);
  const [searchTvShows, setSearchTvShows] = useState<Array<tvShowsType>>([]);

  useEffect(() => {
    let timer = setTimeout(() => {
      navigate(
        `/${mediaType == "MOVIE" ? "movie" : "tv-show"}/search/${searchString}`
      );
      if (searchString == "") {
        return;
      }
      setIsLoading(true);

      fetch(
        `http://${SERVER_URL}/${
          mediaType == "MOVIE" ? "movie" : "tv-show"
        }s/search/${searchString}`
      )
        .then((res) => {
          return res.json();
        })
        .then((body: Array<moviesType | tvShowsType>) => {
          if (mediaType == "MOVIE") {
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

  useEffect(() => {
    store.dispatch(othersActions.changeAppBarLoading(isLoading));
  }, [isLoading]);

  return (
    <Box className="flex flex-col w-full items-center px-8 lg:px-36">
      <Box className="flex gap-2 pb-6">
        <Chip
          label="Movies"
          variant={mediaType == "MOVIE" ? "filled" : "outlined"}
          onClick={() => {
            setMediaType("MOVIE");
            setSearchString("");
          }}
          clickable
        />
        <Chip
          label="Tv Shows"
          variant={mediaType == "MOVIE" ? "outlined" : "filled"}
          onClick={() => {
            setSearchString("");
            setMediaType("TVSHOW");
          }}
          clickable
        />
      </Box>
      <Box className="flex w-full lg:w-[50%] pb-12">
        <Autocomplete
          freeSolo
          className="w-full"
          loading={isLoading}
          inputValue={searchString}
          onInputChange={(_, newValue) => {
            return setSearchString(newValue);
          }}
          options={
            mediaType == "MOVIE"
              ? searchMovies.reduce((movieArray: string[], movie) => {
                  if (
                    !movieArray.find((movieName) => movieName == movie.title)
                  ) {
                    movieArray.push(movie.title.trim());
                  }
                  return movieArray;
                }, [])
              : searchTvShows.reduce((tvShowArray: string[], tvshow) => {
                  if (
                    !tvShowArray.find((tvShowName) => tvShowName == tvshow.name)
                  ) {
                    tvShowArray.push(tvshow.name.trim());
                  }
                  return tvShowArray;
                }, [])
          }
          renderInput={(params) => (
            <TextField
              autoFocus
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
              label={mediaType == "MOVIE" ? "Movie" : "Tv Show"}
            />
          )}
        />
      </Box>
      <Grid container>
        {mediaType == "MOVIE" &&
          searchMovies
            .filter((movie) => !!movie.posterPath)
            .map((movie) => {
              return (
                <Grid key={movie.id} item xs={4} md={3} lg={2}>
                  <MediaTile
                    id={movie.id}
                    posterPath={movie.posterPath}
                    mediaType={mediaType}
                  />
                </Grid>
              );
            })}
        {mediaType == "TVSHOW" &&
          searchTvShows
            .filter((tvshow) => !!tvshow.posterPath)
            .map((tvshow) => (
              <Grid key={tvshow.id} item xs={4} md={3} lg={2}>
                <MediaTile
                  id={tvshow.id}
                  posterPath={tvshow.posterPath}
                  mediaType={mediaType}
                />
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};

export default SearchPage;
