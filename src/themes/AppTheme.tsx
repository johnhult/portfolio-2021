import { Theme } from "@theme-ui/css";
import "@emotion/react";

// Strong typing for Emotion's theme (useful for instance when using <Global />)
declare module "@emotion/react" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends AppThemeType {}
}

export interface AppThemeType extends Theme {
  // theme UI works with an array of breakpoints
  // https://theme-ui.com/theme-spec/#breakpoints
  breakpoints: string[];
  colors: typeof colorTokens;
}

const colorTokens = {
  black: "#000000",
  white: "#ffffff",
  dark: "#181818",
  yellow: "#ffcf00",
  lightYellow: "#b1a367",
};

const mediaQueries = {
  tablet: "640px",
  laptop: "1024px",
  desktop: "1440px",
  wideScreens: "1920px",
};

const defaultFonts =
  '"Cabin", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif';

const fonts = {
  body: defaultFonts,
  heading: defaultFonts,
  display: '"Playfair Display", serif',
  monospace: "Menlo, monospace",
};

const fontWeights = {};

const AppTheme = {
  breakpoints: Object.values(mediaQueries),
  colors: {
    ...colorTokens,
  },
  fonts,
  text: {
    heading: {
      fontFamily: "inherit",
    },
    h1: {
      variant: "heading",
      fontSize: "68px",
    },
    h2: {
      fontSize: "36px",
      fontFamily: "display",
    },
  },
  buttons: {
    primary: {
      outline: "none",
    },
  },
  links: {},
  forms: {
    label: {
      px: "s",
    },
    // variant used e.g. in PostRouteForm
    bigLabel: {
      variant: "text.bodySemibold",
      mb: "xs",
    },
  },
};

export default AppTheme;
