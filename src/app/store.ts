import {
  combineReducers,
  configureStore,
  ThunkAction,
  Action,
  PayloadAction,
} from "@reduxjs/toolkit";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import boardReducer from "../reducers/BoardSlice";
import playersSlice from "../reducers/PlayersSlice";
import gameSlice from "../reducers/GameSlice";
import settingsReducer from "../reducers/SettingsSlice";
import markHistorySlice from "../reducers/MarkHistorySlice";
import scoreHistorySlice from "../reducers/ScoreHistorySlice";

const combinedReducer = combineReducers({
  settings: settingsReducer,
  board: boardReducer,
  players: playersSlice,
  game: gameSlice,
  markHistory: markHistorySlice,
  scoreHistory: scoreHistorySlice,
});

function resetApp(
  state: RootState,
  action: PayloadAction<{ excludeReducers: string[] }>
): RootState {
  let newState: RootState = {};
  for (const reducer of action.payload.excludeReducers) {
    newState[reducer] = state[reducer];
  }
  return newState;
}

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["settings"], // only persist user settings
};

const persistedReducer = persistReducer(persistConfig, combinedReducer);

// TODO: resolve any type
const rootReducer: any = (state: RootState, action: PayloadAction<any>) => {
  if (action.type === "app/reset") {
    state = resetApp(state, action);
  }
  return persistedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  // Resolves https://stackoverflow.com/questions/61704805/getting-an-error-a-non-serializable-value-was-detected-in-the-state-when-using
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
