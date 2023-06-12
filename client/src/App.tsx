import React from "react";
import logo from "./logo.svg";
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

function App() {
  const theme = createTheme({
    palette: { mode: "dark", primary: { main: "#E50914" } },
    typography: { fontFamily: "Lato, sans-serif" },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <StyledEngineProvider injectFirst>
          <Provider store={store}>
            <HomePage></HomePage>
          </Provider>
        </StyledEngineProvider>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
