import { Box, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Props = {
  status: "NOTLOADING" | "LOADING" | "ERROR";
  mediaPosterPath?: string;
};

const LoadingImagePoster: React.FC<Props> = (props) => {
  const id = Number(useParams<{ id: string }>()["id"]);
  const [isImageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    if (
      props.status == "NOTLOADING" &&
      !props.mediaPosterPath &&
      isImageLoading
    ) {
      setImageLoading(false);
    }
  }, [props.status, props.mediaPosterPath, isImageLoading]);

  useEffect(() => {
    setImageLoading(true);
  }, [id]);

  return (
    <>
      {(props.status == "LOADING" || isImageLoading) && (
        <Box className="w-full mb-12 p-2" sx={{ aspectRatio: "2 / 3" }}>
          <Skeleton
            sx={{ transform: "none" }}
            className="w-full h-full"
            component={"div"}
          ></Skeleton>
        </Box>
      )}
      {props.status == "NOTLOADING" && !props.mediaPosterPath && (
        <Box
          className={`w-full h-72 md:h-full flex items-center justify-center bg-zinc-800 text-zinc-200`}
        >
          <Typography className="my-auto" variant="subtitle1">
            Preview Not Available
          </Typography>
        </Box>
      )}
      {props.mediaPosterPath && (
        <img
          className={`w-full mb-12 ${isImageLoading ? "hidden" : ""}`}
          src={`https://image.tmdb.org/t/p/w780/${props.mediaPosterPath}`}
          alt=""
          onLoad={() => setImageLoading(false)}
          onError={() => setImageLoading(false)}
        />
      )}
    </>
  );
};

export default LoadingImagePoster;
