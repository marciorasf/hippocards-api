import { createMuiTheme } from "@material-ui/core/styles";

import colors from "./colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
  },
  typography:{
    button:{
      fontFamily: "Rubik",
      fontWeight: 500
    }
  }
});

export default theme;
