import { Box } from "@mui/material";
import { PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";

const PaddingTopWrapper: React.FC<PropsWithChildren<{ pt?: number }>> = (
  props
) => {
  const location = useLocation().pathname;

  return (
    <Box key={location} sx={{ paddingTop: props.pt }}>
      {props.children}
    </Box>
  );
};

export default PaddingTopWrapper;
