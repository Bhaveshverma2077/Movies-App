import { Box, Button, Typography } from "@mui/material";
import { moviesType } from "../store/movies-slice";
import { useNavigate } from "react-router-dom";

const OneGenreItem: React.FC<{
  genre: { id?: number; name?: string };
  movie?: moviesType;
}> = (props) => {
  const navigate = useNavigate();
  return (
    <Button
      className={`transition-transform text-zinc-200 p-0 relative w-full`}
      onClick={() => {
        navigate(`/movie/${props.movie?.id}`);
      }}
      sx={{
        // "& div": { opacity: 0.4 },
        "&:hover": {
          sm: { transform: "scale(1.1)", zIndex: "1" },

          //   xs: { "& div": { opacity: 0.7 } },
        },
      }}
    >
      {/* <Typography
        fontWeight={"fontWeightBold"}
        sx={{ transform: "translate(-50%,-50%)" }}
        component={"h3"}
        className="absolute text-3xl sm:text-xl  lg:text-lg   z-10 top-1/2 left-1/2"
      >
        {props.movie?.title}
      </Typography> */}
      <Box className="bg-zinc-800 transition-opacity">
        {props.movie && (
          <img
            className="w-full block"
            src={`https://image.tmdb.org/t/p/w500${props.movie!.posterPath}`}
            alt=""
          />
        )}
      </Box>
    </Button>
  );
};

export default OneGenreItem;
