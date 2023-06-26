import { Button } from "@mui/material";
import { moviesType } from "../store/movies-slice";
import { useNavigate } from "react-router-dom";
import { tvShowsType } from "../store/tv-shows-slice";

const MovieOrTvShowTile: React.FC<{
  genre: { id?: number; name?: string };
  movie?: moviesType;
  tvShow?: tvShowsType;
}> = (props) => {
  const navigate = useNavigate();

  return (
    <Button
      className={`transition-transform p-0 relative w-full`}
      onClick={() => {
        if (props.movie) return navigate(`/movie/${props.movie?.id}`);
        return navigate(`/tv-show/${props.tvShow?.id}`);
      }}
      sx={{
        "&:hover": {
          sm: { transform: "scale(1.1)", zIndex: "1" },
        },
      }}
    >
      {props.movie && (
        <img
          className="w-full block"
          src={`https://image.tmdb.org/t/p/w500${props.movie?.posterPath}`}
          alt=""
        />
      )}
      {props.tvShow && (
        <img
          className="w-full block"
          src={`https://image.tmdb.org/t/p/w500${props.tvShow?.posterPath}`}
          alt=""
        />
      )}
    </Button>
  );
};

export default MovieOrTvShowTile;
