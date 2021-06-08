const _ = require("lodash"); //eslint-disable-line @typescript-eslint/no-var-requires
const commonUiConfig = require("@govtechsg/tradetrust-ui-components/build/tailwind"); //eslint-disable-line @typescript-eslint/no-var-requires

// https://tailwindcss.com/docs/theme
const localConfig = {
  purge: {
    content: [
      "./src/**/*.ts",
      "./src/**/*.tsx",
      "./src/**/*.js",
      "./src/**/*.jsx",
      "./node_modules/@govtechsg/tradetrust-ui-components/src/**/*.tsx",
    ],
  },
  theme: {
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
      display: ["Roboto", "sans-serif"],
      body: ["Roboto", "sans-serif"],
    },
    extend: {
      // START - to shift/consolidate this later in common-ui
      colors: {
        brand: {
          100: "#F7F8FC",
        },
      },
      // END - to shift/consolidate this later in common-ui
      inset: {
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        7: "1.75rem",
        8: "2rem",
      },
      minWidth: {
        135: "135px",
        200: "200px",
      },
      minHeight: {
        400: "400px",
        600: "600px",
      },
      maxHeight: {
        0: "0",
        full: "1000px",
      },
      transitionProperty: {
        height: "max-height",
      },
      boxShadow: {
        default: `0 0 0 8px ${commonUiConfig.theme.extend.colors.blue["300"]}`,
        accept: `0 0 0 8px ${commonUiConfig.theme.extend.colors.green["100"]}`,
        warning: `0 0 0 8px ${commonUiConfig.theme.extend.colors.yellow}`,
        invalid: `0 0 0 8px ${commonUiConfig.theme.extend.colors.red["200"]}`,
        dropdown: `0px 4px 20px rgba(0, 0, 0, 0.15)`,
      },
    },
  },
};
const finalConfig = _.merge(commonUiConfig, localConfig); // deep merge

module.exports = finalConfig;
