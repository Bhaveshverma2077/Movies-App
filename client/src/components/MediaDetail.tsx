import { useNavigate, useParams } from "react-router-dom";

import { Box, Button, Grid, Rating, Typography } from "@mui/material";

import ScrollableRow from "../components/ScrollableRow";
import MovieDetailTable from "../components/MovieDetailTable";
import LoadingContent from "../components/LoadingContent";
import ScrollableRowTile from "../components/ScrollableRowTile";
import LoadingImagePoster from "../components/LoadingImagePoster";

import { detailedMoviesType, moviesType } from "../app-data";
import { detailedtvShowsType, tvShowsType } from "../app-data";

type Props = {
  status: "NOTLOADING" | "LOADING" | "ERROR";
  media?: detailedMoviesType | detailedtvShowsType;
  mediaType: "MOVIE" | "TVSHOW";
};

const MediaDetail: React.FC<Props> = ({ status, media, mediaType }) => {
  const navigate = useNavigate();

  return (
    <Grid container>
      <Grid className="md:hidden" item xs={12}>
        <LoadingImagePoster
          mediaPosterPath={media?.posterPath}
          status={status}
        ></LoadingImagePoster>
      </Grid>
      <Grid item xs={12} md={8}>
        <Box className="flex flex-col h-full justify-center gap-4 pl-6 lg:pl-36 mt-10 pr-6">
          {status == "LOADING" && <LoadingContent />}
          {status == "NOTLOADING" && (
            <>
              <Typography
                className="text-5xl lg:text-6xl font-bold"
                component="h1"
              >
                {mediaType == "MOVIE"
                  ? (media as detailedMoviesType)?.title
                  : (media as detailedtvShowsType)?.name}
              </Typography>
              <Box className="flex gap-2 items-center">
                <Rating
                  name="read-only"
                  value={media?.rating ? media?.rating / 2 : 0}
                  precision={0.25}
                  readOnly
                />
                <Typography className="text-lg lg:text-xl" component="h3">
                  {media?.ratingCount}
                </Typography>
              </Box>
              <Typography
                className="text-sm lg:text-base  text-zinc-400"
                variant="subtitle1"
                component="h2"
              >
                {media?.overview}
              </Typography>
              <Box className="flex gap-2">
                {media?.genres.map((genre) => (
                  <Button
                    onClick={() => {
                      navigate(
                        `/${
                          mediaType == "MOVIE" ? "movie" : "tv-show"
                        }/genre/${genre.name.toLowerCase()}`
                      );
                    }}
                    key={genre.id}
                    className="bg-zinc-700 text-zinc-200"
                    size="small"
                    variant="text"
                  >
                    <Typography variant="subtitle2" fontWeight="fontWeightBold">
                      {genre.name}
                    </Typography>
                  </Button>
                ))}
              </Box>
              <Box className="pt-12"></Box>
              {media?.watchProvider.length === 0 ? (
                <Typography variant="body1">
                  Currently Not available for streaming
                </Typography>
              ) : (
                <Box className="flex items-center gap-3">
                  {media?.watchProvider.map((provider) => (
                    <Box className="w-12" key={provider.providerName}>
                      {" "}
                      <img
                        className="w-full"
                        src={`https://image.tmdb.org/t/p/original${provider.logoPath}`}
                        alt=""
                      />
                    </Box>
                  ))}
                </Box>
              )}
              <Typography variant="h6">
                {mediaType == "MOVIE"
                  ? (media as detailedMoviesType)?.releaseDate?.substring(0, 4)
                  : (media as detailedtvShowsType)?.firstAirDate?.substring(
                      0,
                      4
                    )}
              </Typography>
            </>
          )}
        </Box>
      </Grid>
      <Grid className="hidden md:block" item xs={4}>
        <LoadingImagePoster
          mediaPosterPath={media?.posterPath}
          status={status}
        ></LoadingImagePoster>
      </Grid>
      <Grid item xs={12} md={8}>
        <Box className="flex w-[100%] mt-16 flex-col gap-12 md:px-6">
          <Box className="flex flex-col justify-center w-full">
            {status == "NOTLOADING" && media && (
              <ScrollableRow
                title="Videos"
                height={"18rem"}
                width={"32rem"}
                components={media!.videos.map((video) => (
                  <Box
                    key={video.key}
                    sx={{
                      scrollSnapAlign: "center",
                    }}
                  >
                    <iframe
                      className="border-none w-[100vw] h-[56vw] md:w-[60vw] md:h-[34vw] max-w-[36rem] max-h-[20rem]"
                      src={`https://www.youtube-nocookie.com/embed/${video.key}`}
                      title="YouTube video player"
                      allow="encrypted-media; fullscreen;"
                    ></iframe>
                  </Box>
                ))}
              ></ScrollableRow>
            )}
          </Box>
          {media &&
            media.recommendations &&
            media.recommendations.length != 0 && (
              <ScrollableRow
                title="Recommendations"
                components={media.recommendations.map((data) => (
                  <ScrollableRowTile
                    posterOrBackdrop={"POSTER"}
                    key={data.id}
                    height={"18rem"}
                    width={"12rem"}
                    movie={
                      mediaType == "MOVIE" ? (data as moviesType) : undefined
                    }
                    tvShow={
                      mediaType == "TVSHOW" ? (data as tvShowsType) : undefined
                    }
                  ></ScrollableRowTile>
                ))}
                height={"18rem"}
                width={"12rem"}
              />
            )}
          {media && media.similar && media.similar.length != 0 && (
            <ScrollableRow
              title="Similar"
              components={media.similar.map((data) => (
                <ScrollableRowTile
                  posterOrBackdrop={"POSTER"}
                  key={data.id}
                  height={"18rem"}
                  width={"12rem"}
                  movie={
                    mediaType == "MOVIE" ? (data as moviesType) : undefined
                  }
                  tvShow={
                    mediaType == "TVSHOW" ? (data as tvShowsType) : undefined
                  }
                ></ScrollableRowTile>
              ))}
              height={"18rem"}
              width={"12rem"}
            />
          )}
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        {/* <MovieDetailTable movie={movie}></MovieDetailTable> */}
      </Grid>
    </Grid>
  );
};

export default MediaDetail;
