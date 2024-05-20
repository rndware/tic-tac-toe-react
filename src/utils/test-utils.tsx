import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import type { RenderOptions } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import type { AppStore, RootState } from "../app/store";

// As a basic setup, import your same slice reducers
import boardReducer from "../reducers/BoardSlice";
import playersSlice from "../reducers/PlayersSlice";
import gameSlice from "../reducers/GameSlice";
import settingsSlice from "../reducers/SettingsSlice";
import markHistorySlice from "../reducers/MarkHistorySlice";
import scoreHistorySlice from "../reducers/ScoreHistorySlice";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: {
        settings: settingsSlice,
        board: boardReducer,
        players: playersSlice,
        game: gameSlice,
        markHistory: markHistorySlice,
        scoreHistory: scoreHistorySlice,
      },
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

// Test harness to mount components designed to run within a Route
export const RouterTestHarness = (props: { children: JSX.Element }) => (
  <BrowserRouter>
    <Routes>
      <Route path="*" element={props.children} />
    </Routes>
  </BrowserRouter>
);
