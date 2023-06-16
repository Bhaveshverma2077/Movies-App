import {
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { detailedMoviesType } from "../store/movies-slice";

const MovieDetailTable: React.FC<{ movie: detailedMoviesType | undefined }> = ({
  movie,
}) => {
  return (
    <TableContainer component={Paper} className="w-full">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">Info</Typography>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell className="font-bold">Adult</TableCell>
            <TableCell>{String(movie?.adult)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-bold">Release Date</TableCell>
            <TableCell>
              {movie?.releaseDate &&
                new Date(movie.releaseDate).toLocaleString("default", {
                  year: "numeric",
                  day: "numeric",
                  month: "long",
                })}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-bold">Runtime</TableCell>
            <TableCell>
              {movie?.runtime
                ? `${Math.floor(movie?.runtime / 60)} hours ${
                    movie?.runtime % 60
                  } min`
                : "0 min"}{" "}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-bold">Homepage</TableCell>
            <TableCell>
              <Link href={movie?.homepage} className="cursor-pointer">
                {movie?.homepage}
              </Link>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-bold">Status</TableCell>
            <TableCell>{movie?.status}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MovieDetailTable;
