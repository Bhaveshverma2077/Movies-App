import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { StyledEngineProvider } from "@mui/material";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <h1 className="text-6xl">Working</h1>
    </StyledEngineProvider>
  );
}

export default App;
