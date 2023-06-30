import { useState } from "react";

import { Box, Skeleton } from "@mui/material";

const LoadingGenreImage: React.FC<{ backdrop: string }> = (props) => {
  const [isImageLoading, setImageLoading] = useState(true);
  return (
    <>
      {isImageLoading && (
        <Skeleton sx={{ transform: "none" }}>
          {
            <Box className="bg-zinc-800 transition-opacity">
              <img className="w-full block" src={`/placeholder.jpg`} alt="" />
            </Box>
          }
        </Skeleton>
      )}
      <Box
        className={`bg-zinc-800 transition-opacity ${
          isImageLoading ? "hidden" : "block"
        }`}
      >
        <img
          className="w-full block"
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
