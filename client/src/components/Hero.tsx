import { Box, Button, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const startingImgUrl = "https://image.tmdb.org/t/p/original";

const Hero: React.FC<{ img: string; logoImg: string; description: string }> = (
  props
) => {
  return (
    <Box
      className={`flex items-end  md:h-[calc(100vh)] h-[calc(93vh)] -mb-28 bg-cover  bg-center md:bg-left w-full`}
      sx={{ backgroundImage: `url(${startingImgUrl}${props.img})` }}
    >
      <Box
        sx={{
          background: {
            xs: "linear-gradient(90deg, rgba(0,0,0,0.6) 0%,rgba(0,0,0,0.6) 70%,  rgba(0,0,0,0.6) 100%);",
            sm: "linear-gradient(90deg, rgba(0,0,0,0.6) 0%,rgba(0,0,0,0.6) 70%,  rgba(0,0,0,0.6) 100%);",
            md: "linear-gradient(90deg, rgba(0,0,0,0.6) 0%,rgba(0,0,0,1) 70%,  rgba(0,0,0,0) 100%);",
          },
        }}
        className="flex flex-col justify-center h-80 md:h-full md:min-w-[30rem] w-full md:w-[40vw]  p-4 md:p-8"
      >
        <Box
          className="flex flex-col gap-4 md:gap-6 md:items-start items-center"
          sx={{ transform: "translate(0,-2rem)" }}
        >
          <Box className="max-w-[28rem] md:min-w-[22rem] w-72 md:w-[34vw] flex">
            <img className="w-full" src={`${startingImgUrl}${props.logoImg}`} />
          </Box>
          <Box className="max-w-[24rem] ">
            <Typography
              variant="subtitle1"
              component="h3"
              className="text-zinc-300 leading-5"
            >
              {props.description}
            </Typography>
          </Box>
          <Box className=" max-con flex gap-6 md:justify-start justify-center">
            <Button
              variant="contained"
              startIcon={
                <PlayArrowIcon
                  sx={{ transform: "scale(1.15,1.15)" }}
                ></PlayArrowIcon>
              }
            >
              Pay Now
            </Button>
            <Button
              className="text-[#E50914] bg-slate-200"
              variant="contained"
              startIcon={
                <PlayArrowIcon
                  sx={{ transform: "scale(1.15,1.15)" }}
                ></PlayArrowIcon>
              }
            >
              Watch Later
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
