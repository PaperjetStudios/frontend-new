import { ThemeProvider, createTheme } from "@mui/material/styles";
const colors = require("./colors");
const sizes = require("./sizes");

declare module "@mui/material/styles" {
  interface TypographyVariants {
    title: React.CSSProperties;
    body2: React.CSSProperties;
    body3: React.CSSProperties;
    small1?: React.CSSProperties;
    small2?: React.CSSProperties;
  }

  // interface ButtonVariants {

  // }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    title?: React.CSSProperties;
    body2?: React.CSSProperties;
    body3?: React.CSSProperties;
    small1?: React.CSSProperties;
    small2?: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  // interface ButtonVariantsOptions {

  // }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    title: true;
    body3: true;
    small1: true;
    small2: true;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    iconBox: true;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
      light: colors.light,
    },
    secondary: {
      main: colors.secondary,
      light: colors["secondary-light"],
    },
  },

  typography: {
    title: {
      color: "red",
    },
    subtitle1: {
      fontWeight: 500,
      color: colors["dark"],
      lineHeight: 1.2,
    },
    subtitle2: {
      fontWeight: 400,
      color: colors["grey-dark"],
      lineHeight: 1.2,
    },
    body2: {
      color: colors["grey-dark"],
    },
    body3: {
      fontSize: 13,
    },
    small1: {
      fontSize: 12,
    },
    small2: {
      fontSize: 12,
      textTransform: "uppercase",
      fontWeight: "bold",
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
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: "13px",
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true, // No more ripple!
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "iconBox" },
          style: {
            minWidth: 30,
            fontSize: 20,
            borderRadius: 0,
            border: `2px solid ${colors["grey-lighter"]}`,
          },
        },
        {
          props: { variant: "contained" },

          style: {
            height: 44,
            borderRadius: 0,
          },
        },
      ],
      defaultProps: {
        sx: {
          height: 44,
        },
        disableElevation: true,
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
          subtitle1: "h4",
          subtitle2: "span",
          body1: "span",
          body2: "span",
          small2: "span",
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
