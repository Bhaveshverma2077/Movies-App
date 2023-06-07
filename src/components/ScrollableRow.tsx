import { useRef } from "react";

import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import ScrollableRowSkeleton from "./ScrollableRowSkeleton";

type Props = {
  title: string;
  moviesData: {};
  height: string | number;
  width: string | number;
};

const ScrollableRow: React.FC<Props> = (props) => {
  const ref = useRef<HTMLElement>(null);

  const handleScroll = (where: "backward" | "forward") => {
    if (where === "forward") {
      ref.current?.scrollBy({ left: 800 });
      return;
    }
    ref.current?.scrollBy({ left: -800 });
  };

  return (
    <>
      <Typography variant="h5" className="ml-8 sm:ml-36 mb-3">
        Featured
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
          <ScrollableRowSkeleton height={props.height} width={props.width} />
          <ScrollableRowSkeleton height={props.height} width={props.width} />
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
    </>
  );
};

export default ScrollableRow;
