const colors = require("./src/theme/colors");
const sizes = require("./src/theme/sizes");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "0px",
      sm: `${sizes.breakpoints["sm"]}px`,
      md: `${sizes.breakpoints["md"]}px`,
      lg: `${sizes.breakpoints["lg"]}px`,
      xl: `${sizes.breakpoints["xl"]}px`,
      "2xl": `${sizes.breakpoints["2xl"]}px`,
    },
    extend: {
      colors: {
        transparent: colors.transparent,
        darken: colors["darken"],
        "darken-slight": colors["darken-slight"],
        lighten: colors["lighten"],
        current: colors["current"],
        dark: colors["dark"],
        light: colors["light"],
        primary: colors["primary"],
        "primary-light": colors["primary-light"],
        "primary-dark": colors["primary-dark"],
        secondary: colors["secondary"],
        "secondary-light": colors["secondary-light"],
        "secondary-dark": colors["secondary-dark"],
        tertiary: colors["tertiary"],
        "tertiary-light": colors["tertiary-light"],
        "tertiary-dark": colors["tertiary-dark"],
        grey: colors["grey"],
        "grey-dark": colors["grey-dark"],
        "grey-light": colors["grey-light"],
        "grey-lighter": colors["grey-lighter"],
        error: colors["error"],
        selected: colors["selected"],
      },
      spacing: {
        searchbar: sizes["searchbar"],
        wrapper: `${sizes["pageWidth"]}px`,
        "4/5": "80%",
        "9/10": "90%",
      },
      maxWidth: {
        wrapper: `${sizes["pageWidth"]}px`,
      },
      minWidth: {
        modalWidth: `${sizes["modalWidth"]}px`,
      },
    },
  },
  plugins: [require("tailwindcss-textshadow")],
};
