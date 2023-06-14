import { useRef } from "react";

import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { tvShowsStateType } from "../store/tv-shows-slice";
import { movieStateType } from "../store/movies-slice";
import ScrollableRowTile from "./ScrollableRowTile";
import ScrollableRowSkeleton from "./ScrollableRowSkeleton";

interface Props {
  title: string;
  moviesData?: movieStateType; // only renders movies if both movieData and tvShowsData is Provided
  tvShowsData?: tvShowsStateType; //
  height: string | number;
  width: string | number;
}

const ScrollableRow = (props: Props) => {
  const ref = useRef<HTMLElement>(null);

  const handleScroll = (where: "backward" | "forward") => {
    if (where === "forward") {
      ref.current?.scrollBy({ left: 800 });
      return;
    }
    ref.current?.scrollBy({ left: -800 });
  };

  return (
    <Box>
      <Typography variant="h5" className="ml-8 sm:ml-36 mb-3">
        {props.title}
      </Typography>
      <Box className="relative">
        <Box
          ref={ref}
          className=" flex overflow-x-auto gap-2 transition-all"
          sx={{
            "&::-webkit-scrollbar": { display: "none" },
            scrollBehavior: "smooth",
            scrollSnapType: "x mandatory",
          }}
        >
          {props.moviesData?.movies.length === 0 &&
            [...Array(8)].map((_, i) => (
              <ScrollableRowSkeleton
                key={i}
                height={props.height}
                width={props.width}
              />
            ))}
          {props.tvShowsData?.tvShows.length === 0 &&
            [...Array(8)].map((_, i) => (
              <ScrollableRowSkeleton
                key={i}
                height={props.height}
                width={props.width}
              />
            ))}

          {props.moviesData &&
            props.moviesData.movies.map((data) => (
              <ScrollableRowTile
                key={data.id}
                height={props.height}
                width={props.width}
                movie={data}
              ></ScrollableRowTile>
            ))}
          {props.tvShowsData &&
            !props.moviesData &&
            props.tvShowsData.tvShows.map((data) => (
              <ScrollableRowTile
                key={data.id}
                height={props.height}
                width={props.width}
                tvShow={data}
              ></ScrollableRowTile>
            ))}
        </Box>
        <IconButton
          className="absolute top-1/2"
          sx={{ transform: "translateY(-50%)" }}
          onClick={() => handleScroll("backward")}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton
          className="absolute top-1/2 right-0"
          sx={{ transform: "translateY(-50%)" }}
          onClick={() => handleScroll("forward")}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ScrollableRow;
