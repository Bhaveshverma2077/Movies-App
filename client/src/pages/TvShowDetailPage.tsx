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
import MediaDetail from "../components/MediaDetail";

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
    <MediaDetail
      media={tvshow}
      status={status}
      mediaType="TVSHOW"
    ></MediaDetail>
  );
};

export default TvShowDetailPage;
