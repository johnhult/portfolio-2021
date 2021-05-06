import React from "react";
import { Global } from "@emotion/react";

/**
 * Component providing global style for the application
 * @see https://theme-ui.com/guides/global-styles
 *
 * NOTE: Sanitize, a css-reset library is also loaded directly from the public/index.html template file
 * NOTE: The styles prop can either be a plain object, or a function accepting the current theme as parameter
 *
 */
const GlobalStyle: React.FC = (props) => (
  <Global
    {...props}
    styles={(theme) => {
      return {
        // HTML layout
        "*": {
          boxSizing: "border-box",
        },
        html: {
          height: "100%",
        },
        body: {
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          margin: 0,
          padding: 0,
          backgroundColor: theme.colors.dark,
          color: theme.colors.white,
          height: "100%",
          fontFamily: "Cabin, sans-serif",
        },
        "#root": {
          height: "100%",
        },
        // HTML components
        a: {
          cursor: "pointer",
        },
        button: {
          cursor: "pointer",
          "&:disabled": {
            cursor: "not-allowed",
          },
        },
      };
    }}
  />
);

export default GlobalStyle;
