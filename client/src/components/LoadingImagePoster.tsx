import { Box, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
  status: "NOTLOADING" | "LOADING" | "ERROR";
  mediaPosterPath?: string;
};

const LoadingImagePoster: React.FC<Props> = (props) => {
  const [isImageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    if (
      props.status == "NOTLOADING" &&
      props.mediaPosterPath &&
      isImageLoading
    ) {
      setImageLoading(false);
    }
  }, [props.status]);

  if (props.status == "LOADING" || isImageLoading)
    return (
      <Box className="w-full mb-12 p-4" sx={{ aspectRatio: "2 / 3" }}>
        <Skeleton
          sx={{ transform: "none" }}
          className="w-full h-full"
          component={"div"}
        ></Skeleton>
      </Box>
    );

  if (props.status == "NOTLOADING" && !props.mediaPosterPath)
    return (
      <Box
        className={`w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-200`}
      >
        <Typography className="my-auto" variant="subtitle1">
          Preview Not Available
        </Typography>
      </Box>
    );

  if (props.mediaPosterPath)
    return (
      <img
        className={`w-full mb-12 ${isImageLoading ? "hidden" : ""}`}
        src={`https://image.tmdb.org/t/p/w780/${props.mediaPosterPath}`}
        alt=""
        onLoad={() => setImageLoading(false)}
        onError={() => setImageLoading(false)}
      />
    );

  return <></>;
};

export default LoadingImagePoster;
