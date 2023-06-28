import { Link as RouterLink, useNavigate } from "react-router-dom";

import { Link } from "@mui/material";

const MediaTile: React.FC<{
  id?: number;
  posterPath?: string;
  mediaType: "MOVIE" | "TVSHOW";
}> = (props) => {
  const navigate = useNavigate();

  return (
    <Link
      to={`/${props.mediaType === "MOVIE" ? "movie" : "tv-show"}/${props.id}`}
      component={RouterLink}
      className={`transition-transform p-0 relative w-full block`}
      onClick={() =>
        navigate(
          `/${props.mediaType === "MOVIE" ? "movie" : "tv-show"}/${props.id}`
        )
      }
      sx={{
        "&:hover": {
          sm: { transform: "scale(1.1)", zIndex: "1" },
        },
      }}
    >
      <img
        className="w-full block"
        src={`https://image.tmdb.org/t/p/w500${props.posterPath}`}
        alt=""
      />
    </Link>
  );
};

export default MediaTile;
