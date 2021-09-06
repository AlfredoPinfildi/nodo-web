module.exports = () => {
  const plugins = {
    autoprefixer: {},
    "postcss-nested": {},
    "postcss-custom-media": {
      importFrom: "./breakpoints.js",
    },
    "postcss-preset-env": {
      stage: 2,
    },
  };

  return {
    plugins,
  };
};
