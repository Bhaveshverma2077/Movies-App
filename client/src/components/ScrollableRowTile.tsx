import { useState } from "react";

import { Box, Button, IconButton, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

import { moviesType } from "../store/movies-slice";
import { tvShowsType } from "../store/tv-shows-slice";
import ScrollableRowSkeleton from "./ScrollableRowSkeleton";

type Props = {
  height: number | string;
  width: number | string;
  movie?: moviesType;
  tvShow?: tvShowsType;
};

const ScrollableRowTile: React.FC<Props> = (props) => {
  let movieOrTvData: { id?: number; path?: string; name?: string } = {};

  //movieOrTvData Helper to make code short in JSX below
  if (props.movie) {
    movieOrTvData.id = props.movie?.id;
    movieOrTvData.name = props.movie?.title;
    movieOrTvData.path = props.movie?.posterPath;
  }
  if (props.tvShow) {
    movieOrTvData.id = props.tvShow?.id;
    movieOrTvData.name = props.tvShow?.name;
    movieOrTvData.path = props.tvShow?.posterPath;
  }

  const [isLoading, setIsLoading] = useState(true);
  const [isHover, setIsHover] = useState(false);

  return (
    <Button
      disabled={isLoading}
      onClick={() => {
        console.log(movieOrTvData.id);
      }}
      onMouseOver={() => {
        setIsHover(true);
      }}
      onMouseOut={() => {
        setIsHover(false);
      }}
      className={`realtive flex-shrink-0 p-0 `}
      sx={{
        scrollSnapAlign: "center",
        width: props.width,
        height: props.height,
      }}
    >
      {isLoading && (
        <ScrollableRowSkeleton height={props.height} width={props.width} />
      )}
      <img
        className={`scale-50 w-full ${isLoading ? "hidden" : ""}`}
        src={`https://image.tmdb.org/t/p/w500${movieOrTvData.path}`}
        alt={movieOrTvData.name}
        onLoad={() => {
          setIsLoading(false);
        }}
      />
      <Box
        className={`bg-red-700  ${
          isHover ? "visible opacity-70" : "invisible opacity-0"
        } absolute w-full h-full p-3 flex flex-col justify-between transition-opacity`}
      ></Box>
      <Box
        className={`${
          isHover ? "visible opacity-100" : "invisible opacity-0"
        } absolute w-full h-full p-3 flex flex-col justify-between `}
      >
        <Typography
          variant="subtitle1"
          fontWeight="fontWeightBold"
          color={"white"}
        >
          {movieOrTvData.name}
        </Typography>
        <Box className="flex justify-between items-center">
          <Typography
            className="relative"
            fontWeight="fontWeightBold"
            variant="subtitle2"
            color="white"
            component="div"
          >
            {props.movie && props.movie.rating}
            {props.tvShow && props.tvShow.rating}
            <StarIcon
              sx={{ transform: "translate(0,-1px)" }}
              className="absolute h-5"
            />
          </Typography>
          <Typography
            fontWeight="fontWeightBold"
            variant="subtitle2"
            color={"white"}
          >
            {props.movie && props.movie?.releaseDate.substring(0, 4)}
            {props.tvShow &&
              `Since ${props.tvShow?.firstAirDate.substring(0, 4)}`}
          </Typography>
        </Box>
      </Box>
    </Button>
  );
};

export default ScrollableRowTile;
