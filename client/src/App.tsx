import { Provider } from "react-redux";

import {
  RouterProvider,
  createBrowserRouter,
  useParams,
} from "react-router-dom";

import {
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
  CssBaseline,
} from "@mui/material";

import "./App.css";

import Layout from "./pages/Layout";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import TvShowDetailPage from "./pages/TvShowDetailPage";
import GenrePage from "./pages/GenrePage";
import MoviesPage from "./pages/MoviesPage";
import SearchPage from "./pages/SearchPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import MediaGridPage from "./pages/MediaGridPage";
import TvShowsPage from "./pages/TvShowsPage";

import PaddingTopWrapper from "./components/PaddingTopWrapper";

import store from "./store";

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
    components: {
      MuiMenu: {
        styleOverrides: {
          // paper: { backgroundColor: "rgba(0, 0, 0, 0.3)" },
        },
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
                {
                  path: ":genreName",
                  element: (
                    // PaddingTopWrapper: gives top padding to pages because of AppBar absolute positioning
                    <PaddingTopWrapper pt={4}>
                      <MediaGridPage />
                    </PaddingTopWrapper>
                  ),
                },
                {
                  path: "",
                  element: (
                    <PaddingTopWrapper pt={6}>
                      <GenrePage />
                    </PaddingTopWrapper>
                  ),
                },
              ],
            },
            {
              path: ":id",
              element: <MovieDetailPage />,
            },
            {
              path: "search",
              element: (
                <PaddingTopWrapper pt={10}>
                  <SearchPage />
                </PaddingTopWrapper>
              ),
            },
            {
              path: "search/:searchString",
              element: (
                <PaddingTopWrapper pt={10}>
                  <SearchPage />
                </PaddingTopWrapper>
              ),
            },
          ],
        },
        {
          path: "tv-show",
          children: [
            { path: "", element: <TvShowsPage /> },
            {
              path: "search",
              element: (
                <PaddingTopWrapper pt={10}>
                  <SearchPage />
                </PaddingTopWrapper>
              ),
            },
            {
              path: "search/:searchString",
              element: (
                <PaddingTopWrapper pt={10}>
                  <SearchPage />
                </PaddingTopWrapper>
              ),
            },
            {
              path: "genre",
              children: [
                {
                  path: ":genreName",
                  element: (
                    // PaddingTopWrapper: gives top padding to pages because of AppBar absolute positioning
                    <PaddingTopWrapper pt={4}>
                      <MediaGridPage />
                    </PaddingTopWrapper>
                  ),
                },
                {
                  path: "",
                  element: (
                    <PaddingTopWrapper pt={6}>
                      <GenrePage />
                    </PaddingTopWrapper>
                  ),
                },
              ],
            },
            { path: ":id", element: <TvShowDetailPage /> },
          ],
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
            <RouterProvider router={router} />
          </Provider>
        </StyledEngineProvider>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
