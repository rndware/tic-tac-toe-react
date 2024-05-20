import { grey, purple } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export const appTheme = createTheme({
  palette: {
    mode: "dark",
    primary: grey,
    secondary: purple,
  },
  typography: {
    allVariants: {
      color: grey[50], // $text-color
    },
  },
});
