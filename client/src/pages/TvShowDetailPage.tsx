import { Box, Button, Grid, Rating, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../store";
import ScrollableRow from "../components/ScrollableRow";
import { useNavigate, useParams } from "react-router-dom";
import LoadingContent from "../components/LoadingContent";
import {
  detailedtvShowsType,
  fetchTvShowDetail,
} from "../store/tv-shows-slice";
import ScrollableRowTile from "../components/ScrollableRowTile";

const TvShowDetailPage: React.FC = () => {
  const id = Number(useParams<{ id: string }>()["id"]);

  const [isImageLoading, setImageLoading] = useState(true);

  const navigate = useNavigate();

  const status = useSelector(
    (state: RootState) => state.tvs.detailTvShowStatus
  );

  const tvShowData = useSelector((state: RootState) => state.tvs.detailTvShows);

  let tvshow: detailedtvShowsType | undefined = tvShowData.find(
    (tvShow) => tvShow.id == id
  );

  useEffect(() => {
    store.dispatch(fetchTvShowDetail(id));
    setImageLoading(true);
  }, [id]);

  useEffect(() => {
    if (status == "NOTLOADING" && !tvshow?.posterPath) {
      setImageLoading(false);
    }
  }, [status]);
  return (
    <>
      <Grid container>
        <Grid item xs={8}>
          <Box className="flex flex-col h-full justify-center gap-3 pl-[9.3rem] pr-6">
            {status == "LOADING" && <LoadingContent />}
            {status == "NOTLOADING" && (
              <>
                <Typography className="text-5xl lg:text-6xl" component="h1">
                  {tvshow?.name}
                </Typography>
                <Box className="flex gap-2 items-center">
                  <Rating
                    name="read-only"
                    value={tvshow?.rating ? tvshow?.rating / 2 : 0}
                    precision={0.25}
                    readOnly
                  />
                  <Typography variant="subtitle2">
                    ({tvshow?.ratingCount})
                  </Typography>
                </Box>
                <Typography
                  className="text-zinc-400"
                  variant="subtitle1"
                  component="h2"
                >
                  {tvshow?.overview}
                </Typography>
                <Box className="flex gap-2">
                  {tvshow?.genres.map((genre) => (
                    <Button
                      onClick={() => {
                        navigate(`/tvshow/genre/${genre.name.toLowerCase()}`);
                      }}
                      key={genre.id}
                      className="bg-zinc-700 text-zinc-200"
                      size="small"
                      variant="text"
                    >
                      <Typography
                        variant="subtitle2"
                        fontWeight="fontWeightBold"
                      >
                        {genre.name}
                      </Typography>
                    </Button>
                  ))}
                </Box>
                <Box className="pt-12"></Box>
                {tvshow?.tvShowWatchProvider.length === 0 ? (
                  <Typography variant="body1">
                    Currently Not available for streaming
                  </Typography>
                ) : (
                  <Box className="flex items-center gap-3">
                    {tvshow?.tvShowWatchProvider.map((provider) => (
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
                  {tvshow?.firstAirDate.substring(0, 4)}
                </Typography>
              </>
            )}
          </Box>
        </Grid>
        <Grid item xs={4}>
          {(status == "LOADING" || isImageLoading) && (
            <Box className="w-full mb-12 p-4" sx={{ aspectRatio: "2 / 3" }}>
              <Skeleton
                sx={{ transform: "none" }}
                className="w-full h-full"
                component={"div"}
              ></Skeleton>
            </Box>
          )}
          {status == "NOTLOADING" && !tvshow?.posterPath && (
            <Box
              className={`w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-200`}
            >
              <Typography className="my-auto" variant="subtitle1">
                Preview Not Available
              </Typography>
            </Box>
          )}
          {tvshow?.posterPath && (
            <img
              className={`w-full mb-12 ${isImageLoading ? "hidden" : ""}`}
              src={`https://image.tmdb.org/t/p/w780/${tvshow?.posterPath}`}
              alt=""
              onLoad={() => setImageLoading(false)}
              onError={() => setImageLoading(false)}
            />
          )}
        </Grid>
        <Grid item xs={8}>
          <Box className="flex w-[100%] flex-col gap-12 p-6">
            {tvshow &&
              tvshow.recommendations &&
              tvshow.recommendations.length != 0 && (
                <ScrollableRow
                  title="Recomendations"
                  components={tvshow.recommendations.map((data) => (
                    <ScrollableRowTile
                      posterOrBackdrop={"POSTER"}
                      key={data.id}
                      height={"18rem"}
                      width={"12rem"}
                      tvShow={data}
                    ></ScrollableRowTile>
                  ))}
                  height={"18rem"}
                  width={"12rem"}
                />
              )}
            {tvshow && tvshow.similar && tvshow.similar.length != 0 && (
              <ScrollableRow
                title="Similar"
                components={tvshow.similar.map((data) => (
                  <ScrollableRowTile
                    posterOrBackdrop={"POSTER"}
                    key={data.id}
                    height={"18rem"}
                    width={"12rem"}
                    tvShow={data}
                  ></ScrollableRowTile>
                ))}
                height={"18rem"}
                width={"12rem"}
              />
            )}
          </Box>
        </Grid>

        <Grid item xs={4}>
          {/* <tvshowDetailTable tvshow={tvshow}></tvshowDetailTable> */}
        </Grid>
      </Grid>
    </>
  );
};

export default TvShowDetailPage;
