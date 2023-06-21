import { Box } from "@mui/material";
import { PropsWithChildren } from "react";

const PaddingTopWrapper: React.FC<PropsWithChildren<{ pt?: number }>> = (
  props
) => {
  return <Box sx={{ paddingTop: props.pt }}>{props.children}</Box>;
};

export default PaddingTopWrapper;
