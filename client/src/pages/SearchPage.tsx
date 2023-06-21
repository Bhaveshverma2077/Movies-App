import {
  Autocomplete,
  Box,
  CircularProgress,
  Grid,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import store from "../store";
import { moviesType } from "../store/movies-slice";
import OneGenreItem from "../components/OneGenreItem";
import { useNavigate, useParams } from "react-router-dom";
import PaddingTopWrapper from "../components/PaddingTopWrapper";

const SearchPage: React.FC = () => {
  const routeParams = useParams<{ searchString: string }>();

  const navigate = useNavigate();

  const [searchString, setSearchString] = useState(
    routeParams.searchString ?? ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const [searchMovies, setSearchMovies] = useState<Array<moviesType>>([]);

  useEffect(() => {
    let timer = setTimeout(() => {
      navigate(`/movie/search/${searchString}`);
      if (searchString == "") {
        return;
      }
      setIsLoading(true);

      fetch(`http://192.168.1.7:9000/movies/search/${searchString}`)
        .then((res) => {
          return res.json();
        })
        .then((body: Array<moviesType>) => {
          setSearchMovies(body);
          setIsLoading(false);
        });
    }, 500);

    return () => {
      window.clearTimeout(timer);
    };
  }, [searchString]);

  return (
    <Box className="flex flex-col w-full items-center gap-12 px-8 lg:px-36">
      <Box className="flex w-full lg:w-[50%]">
        <Autocomplete
          freeSolo
          className="w-full"
          loading={isLoading}
          inputValue={searchString}
          onInputChange={(_, newValue) => {
            return setSearchString(newValue);
          }}
          options={searchMovies.map((movie) => movie.title)}
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
              label="Movie"
            />
          )}
        />
      </Box>

      <Grid container>
        {searchMovies.map((movie) => (
          <Grid key={movie.id} item xs={4} md={3} lg={2}>
            {" "}
            <OneGenreItem genre={{}} movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SearchPage;
