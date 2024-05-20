import React from "react";
import { Routes, Route } from "react-router-dom";

import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material";

import Intro from "./pages/intro";
import Settings from "./pages/settings";
import Setup from "./pages/setup";
import Game from "./pages/game";
import NotFound from "./pages/not-found";

import { appTheme } from "./themes/theme";
import { useStoredLanguage } from "./app/hooks";

const App = () => {
  useStoredLanguage();

  return (
    <div className="App">
      <ThemeProvider theme={appTheme}>
        <main className="App__main">
          <Container fixed>
            <Routes>
              <Route path="/" element={<Intro />} />
              <Route path="/intro" element={<Intro />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/setup" element={<Setup />} />
              <Route path="/game" element={<Game />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Container>
        </main>
      </ThemeProvider>
    </div>
  );
};

export default App;
