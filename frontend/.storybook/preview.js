import "../src/styles/index.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  themes: {
    default: "light",
    clearable: false,
    list: [
      { name: "dark", class: "dark", color: "#1F2937" },
      { name: "light", class: "light", color: "#FFFFFF" },
    ],
  },
};
