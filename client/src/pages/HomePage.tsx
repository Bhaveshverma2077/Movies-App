import { Box } from "@mui/material";
import ScrollableRow from "../components/ScrollableRow";
import TopAppBar from "../components/TopAppBar";

const HomePage = () => {
  return (
    <>
      <TopAppBar />
      <Box className="h-8"></Box>
      <ScrollableRow
        title="nice"
        moviesData={{}}
        height={"20rem"}
        width={"15rem"}
      ></ScrollableRow>
    </>
  );
};

export default HomePage;
