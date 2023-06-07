import { Skeleton } from "@mui/material";

type Props = {
  height: string | number;
  width: string | number;
};

const ScrollableRowSkeleton = (props: Props) => {
  return (
    <Skeleton
      className="flex-shrink-0"
      sx={{ scrollSnapAlign: "center" }}
      variant="rounded"
      height={String(props.height)}
      width={String(props.width)}
    />
  );
};

export default ScrollableRowSkeleton;
