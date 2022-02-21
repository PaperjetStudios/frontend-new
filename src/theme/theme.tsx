import { ThemeProvider, createTheme } from "@mui/material/styles";
const colors = require("./colors");
const sizes = require("./sizes");

declare module "@mui/material/styles" {
  interface TypographyVariants {
    title: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    title?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    title: true;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
      light: colors.light,
    },
  },

  typography: {
    title: {
      color: "red",
    },

    subtitle2: {
      fontWeight: 400,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: sizes.breakpoints.sm,
      md: sizes.breakpoints.md,
      lg: sizes.breakpoints.lg,
      xl: sizes.breakpoints.xl,
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true, // No more ripple!
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: "h1",
          h2: "h2",
          h3: "h3",
          h4: "h4",
          h5: "h5",
          h6: "h6",
          subtitle1: "h2",
          subtitle2: "h2",
          body1: "span",
          body2: "span",
        },
      },
    },
    MuiModal: {
      defaultProps: {
        sx: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },
    },
  },
});

const MuiThemeProvider: React.FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MuiThemeProvider;
