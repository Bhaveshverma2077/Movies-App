import { useEffect } from "react";
import { fetchGenreItems, genresList } from "../store/movies-slice";
import { useLocation, useParams } from "react-router-dom";
import store, { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import OneGenreItem from "../components/OneGenreItem";

const OneGenrePage: React.FC = () => {
  const routeParams = useParams<{ genreName: string }>();

  useEffect(() => {
    store.dispatch(fetchGenreItems(routeParams.genreName!.toLocaleLowerCase()));
  }, [routeParams.genreName]);

  const genre = useSelector((state: RootState) =>
    state.movies.genres.find(
      (genre) =>
        genre.genreName.toLowerCase() == routeParams.genreName?.toLowerCase()
    )
  );

  return (
    <Box className="flex flex-col gap-6 py-12 px-8 lg:px-36">
      <Typography className="text-3xl lg:text-5xl" component={"h1"}>
        {genre?.genreName}
      </Typography>
      <Grid container>
        {genre?.movies.map((movie) => (
          <Grid key={movie.id} item xs={4} md={3} lg={2}>
            <OneGenreItem
              genre={{ id: genre?.id, name: genre?.genreName }}
              movie={movie}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OneGenrePage;
