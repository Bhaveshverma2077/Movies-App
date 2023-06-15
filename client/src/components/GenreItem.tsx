import { Box, Button, Typography } from "@mui/material";
import { moviesType } from "../store/movies-slice";

const GenreItem: React.FC<{
  genre: { id: number; name: string };
  movie: moviesType;
}> = (props) => {
  return (
    <Button
      className={`transition-transform text-zinc-200 p-0 relative w-full`}
      sx={{
        "& div": { opacity: 0.4 },
        "&:hover": {
          sm: { transform: "scale(1.1)" },
          xs: { "& div": { opacity: 0.7 } },
        },
      }}
    >
      <Typography
        fontWeight={"fontWeightBold"}
        sx={{ transform: "translate(-50%,-50%)" }}
        component={"h3"}
        className="absolute text-3xl sm:text-2xl  lg:text-xl   z-10 top-1/2 left-1/2"
      >
        {props.genre.name}
      </Typography>
      <Box className="bg-zinc-800 transition-opacity">
        <img
          className=" w-full block"
          src={`https://image.tmdb.org/t/p/w500${props.movie.backdropPath}`}
          alt=""
        />
      </Box>
    </Button>
  );
};

export default GenreItem;
