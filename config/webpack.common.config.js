const HtmlWebpackPlugin = require("html-webpack-plugin");

const path = require("path");

const babelConfigPath = path.join(__dirname, "babel.config.js");
const rootPath = path.resolve(__dirname, "..");
const distPath = path.join(rootPath, "dist");

module.exports = {
  entry: path.resolve(rootPath, "/index.js"),
  output: {
    path: distPath,
    filename: "[name].js",
    clean: true,
    publicPath: "/",
  },
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      filename: `index.html`,
      template: path.resolve(rootPath, "/index.html"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          sources: false,
        },
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            extends: babelConfigPath,
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: "/node_modules/",
        use: ["raw-loader"],
      },
      {
        test: /\.(svg|woff2?|png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
        },
      },
    ],
  },
  resolve: {
    alias: {
      "@app": path.resolve(rootPath),
      "@assets": path.resolve(rootPath, "assets"),
      "@blocks": path.resolve(rootPath, "blocks"),
      "@components": path.resolve(rootPath, "components"),
      "@styles": path.resolve(rootPath, "styles"),
      "@utils": path.resolve(rootPath, "utils"),
      "@pages": path.resolve(rootPath, "pages"),
      "@router": path.resolve(rootPath, "router"),
      "@data": path.resolve(rootPath, "data"),
      "@models": path.resolve(rootPath, "models"),
    },
  },
  stats: "errors-warnings",
  stats: {
    children: false,
  },
};
