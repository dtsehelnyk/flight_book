import { PaletteMode } from "@mui/material";
import { grey, blue } from "@mui/material/colors";

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: blue,
          divider: grey[900],
          background: {
            default: grey[500],
            paper: grey[300],
          },
          text: {
            primary: grey[700],
            secondary: grey[900],
          },
        }
      : {
          primary: blue,
          divider: grey[200],
          background: {
            default: grey[800],
            paper: grey[900],
          },
          text: {
            primary: '#fff',
            secondary: grey.A100,
          },
        }),
  },
});