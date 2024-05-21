import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Difficulty, Lang } from "../types/game";

import { SelectChangeEvent } from "@mui/material/Select";
import SettingsForm from "../components/settings-form";

import "./assets/story.css";

export default {
  title: "Core/Settings Form",
  component: SettingsForm,
  decorators: [
    (story: any) => (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={story()} />
        </Routes>
      </BrowserRouter>
    ),
  ],
};

const copy = {
  title: "Settings",
  difficulty: {
    label: "Game Difficulty",
    options: {
      easy: "Easy",
      normal: "Normal",
      hard: "Hard",
    },
  },
  lang: {
    label: "Language",
    options: {
      en: "English",
      de: "German",
    },
  },
  done: "Done",
};

export const Default = {
  args: {
    copy,
    formControls: [
      {
        key: "difficulty",
        copy: copy.difficulty,
        value: Difficulty.Easy,
        enum: Difficulty,
        onChange: (_: SelectChangeEvent<string>) => {},
        options: copy.difficulty.options,
      },
      {
        key: "lang",
        copy: copy.lang,
        value: "en",
        enum: Lang,
        onChange: (_: SelectChangeEvent<string>) => {},
        options: copy.lang.options,
      },
    ],
  },
};
