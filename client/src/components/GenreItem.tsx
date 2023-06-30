import { useNavigate } from "react-router-dom";

import LoadingGenreImage from "./LoadingGenreImage";

import { Button, Typography } from "@mui/material";

import { genreType } from "../store/movies-slice";

const GenreItem: React.FC<{
  genre: genreType;
  mediaType: "MOVIE" | "TVSHOW";
  backdrop: string;
}> = (props) => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => {
        if (props.mediaType == "MOVIE")
          return navigate(`/movie/genre/${props.genre.name.toLowerCase()}`);
        return navigate(`/tv-show/genre/${props.genre.name.toLowerCase()}`);
      }}
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
      <LoadingGenreImage backdrop={props.backdrop} />
    </Button>
  );
};

export default GenreItem;
