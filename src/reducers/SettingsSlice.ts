import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { Lang, Difficulty } from "../types/game";

export interface Settings {
  language: Lang;
  difficulty: Difficulty;
}

const initialState: Settings = {
  language: Lang.en,
  difficulty: Difficulty.Normal,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<Lang>) {
      state.language = action.payload;
    },
    setDifficulty(state, action: PayloadAction<Difficulty>) {
      state.difficulty = action.payload;
    },
  },
});

export const { setDifficulty, setLanguage } = settingsSlice.actions;

export const getDifficulty = (state: RootState): Difficulty =>
  state.settings.difficulty;

export const getLanguage = (state: RootState): Lang => state.settings.language;

export default settingsSlice.reducer;
