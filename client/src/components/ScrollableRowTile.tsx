import { Box, Button, IconButton } from "@mui/material";
import { moviesType } from "../store/movies-slice";
import { tvShowsType } from "../store/tv-shows-slice";
import { useState } from "react";
import ScrollableRowSkeleton from "./ScrollableRowSkeleton";

type Props = {
  height: number | string;
  width: number | string;
  movie?: moviesType;
  tvShow?: tvShowsType;
};

const ScrollableRowTile: React.FC<Props> = (props) => {
  let movieOrTvData: { id?: number; path?: string; name?: string } = {};

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

  return (
    <Button
      disabled={isLoading}
      className={`flex-shrink-0 p-0`}
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
        className={`w-full ${isLoading ? "hidden" : ""}`}
        src={`https://image.tmdb.org/t/p/w500${movieOrTvData.path}`}
        alt={movieOrTvData.name}
        onLoad={() => {
          setIsLoading(false);
        }}
      />
    </Button>
  );
};

export default ScrollableRowTile;
