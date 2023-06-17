import TopAppBar from "../components/TopAppBar";
import GenreItem from "../components/GenreItem";
import { Grid, Container, Box } from "@mui/material";
import { useSelector } from "react-redux";
import store, { RootState } from "../store";
import { useEffect } from "react";
import { fetchGenre as fetchGenresMovies } from "../store/movies-slice";

const genresList = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

const GenrePage: React.FC = () => {
  const genrePageMovies = useSelector(
    (state: RootState) => state.movies.genrePageMovies
  );

  useEffect(() => {
    store.dispatch(fetchGenresMovies());
  }, []);
  return (
    <>
      <Box className="py-0 sm:py-0 px-0 sm:px-6 lg:px-36">
        <Grid container spacing={{ xs: 0, sm: 3 }}>
          {genrePageMovies.map((genre, i) => (
            <Grid item key={i} lg={3} md={4} sm={6} xs={12}>
              <GenreItem {...genre} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default GenrePage;
