import { Skeleton, Typography, Rating, Button } from "@mui/material";

const LoadingContent: React.FC = () => {
  return (
    <>
      <Skeleton>
        <Typography className="text-5xl lg:text-6xl" component="h1">
          a long movie title
        </Typography>
      </Skeleton>
      <Skeleton>
        {" "}
        <Rating></Rating>{" "}
      </Skeleton>
      <Skeleton>
        <Typography className="text-5xl lg:text-6xl" component="h1">
          a long movie title
        </Typography>{" "}
      </Skeleton>
      <Skeleton>
        <Typography
          className="text-zinc-400"
          variant="subtitle1"
          component="h2"
        >
          a
        </Typography>{" "}
      </Skeleton>
      <Skeleton>
        {" "}
        <Button />
        <Button />
        <Button />{" "}
      </Skeleton>
      <Skeleton>
        <Typography variant="h6">some more text</Typography>{" "}
      </Skeleton>
      <Skeleton>
        <Button />
        <Button />
        <Button />{" "}
      </Skeleton>
    </>
  );
};

export default LoadingContent;
