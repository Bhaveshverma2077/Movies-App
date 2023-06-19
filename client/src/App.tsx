import "./App.css";
import {
  PaletteColorOptions,
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
  CssBaseline,
} from "@mui/material";

import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { Provider } from "react-redux";
import store from "./store";
import GenrePage from "./pages/GenrePage";
import MovieOrTvShowDetailPage from "./pages/MovieOrTvShowDetailPage";
import {
  RouterProvider,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";
import Layout from "./pages/Layout";
import SearchPage from "./pages/SearchPage";
import path from "path";
import OneGenrePage from "./pages/OneGenrePage";
import MoviesPage from "./pages/MoviesPage";
import TvShowsPage from "./pages/TvShowsPage";

function App() {
  const theme = createTheme({
    palette: { mode: "dark", primary: { main: "#E50914" } },
    typography: {
      fontFamily: "Lato, sans-serif",
      fontWeightBold: 700,
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 768,
        lg: 1024,
        xl: 1536,
      },
    },
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "", element: <HomePage /> },
        {
          path: "movie",

          children: [
            { path: "", element: <MoviesPage /> },
            {
              path: "genre",
              children: [
                { path: ":genreName", element: <OneGenrePage /> },
                { path: "", element: <GenrePage /> },
              ],
            },
            { path: ":id", element: <MovieOrTvShowDetailPage /> },
            {
              path: "search",
              element: <SearchPage />,
              children: [{ path: ":searchString" }],
            },
          ],
        },
        {
          path: "tv-show",
          children: [{ path: "", element: <TvShowsPage /> }],
        },
        { path: "/login", element: <AuthPage /> },
        { path: "/signup", element: <AuthPage /> },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <StyledEngineProvider injectFirst>
          <Provider store={store}>
            {<RouterProvider router={router} />}
          </Provider>
        </StyledEngineProvider>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
