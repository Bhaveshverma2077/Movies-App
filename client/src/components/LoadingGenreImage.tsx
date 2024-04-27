import { useState } from "react";

import { Box, Skeleton } from "@mui/material";

const LoadingGenreImage: React.FC<{ backdrop: string }> = (props) => {
  const [isImageLoading, setImageLoading] = useState(true);
  return (
    <>
      {isImageLoading && (
        <Skeleton
          className="w-full aspect-video"
          sx={{ transform: "none" }}
        ></Skeleton>
      )}
      <Box
        className={`bg-zinc-800 transition-opacity ${
          isImageLoading ? "hidden" : ""
        }`}
      >
        <img
          className="w-full h-full block"
          src={`https://image.tmdb.org/t/p/w500${props.backdrop}`}
          alt=""
          onLoad={() => {
            setImageLoading(false);
          }}
        />
      </Box>
    </>
  );
};

export default LoadingGenreImage;
