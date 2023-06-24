import { useRef } from "react";

import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import ScrollableRowSkeleton from "./ScrollableRowSkeleton";

interface Props {
  title: string;
  components: Array<any>;
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

  if (props.components.length == 0) {
    return (
      <Typography className="pl-32" variant="h6">
        No {props.title} Available
      </Typography>
    );
  }

  return (
    <Box>
      <Typography variant="h5" className="ml-8 md:ml-[8rem] mb-3">
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
          {props.components.length === 0 &&
            [...Array(8)].map((_, i) => (
              <ScrollableRowSkeleton
                key={i}
                height={props.height}
                width={props.width}
              />
            ))}
          {props.components.length != 0 && props.components}
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
