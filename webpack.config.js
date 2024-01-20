const { mode } = require("webpack-nano/argv");
const { MiniHtmlWebpackPlugin } = require("mini-html-webpack-plugin");
const { WebpackPluginServe } = require("webpack-plugin-serve");
const { merge } = require("webpack-merge");
const {
  loadCSS,
  extractCSS,
  tailwind,
  autoprefix,
} = require("./config/webpack.parts");
const cssLoaders = [autoprefix(), tailwind()];

module.exports = merge([
  {
    watch: mode === "development",
    entry: ["./src", "webpack-plugin-serve/client"],
    mode,
    plugins: [
      new MiniHtmlWebpackPlugin({ context: { title: "Demo" } }),
      new WebpackPluginServe({
        port: 8080,
        static: "./dist",
        liveReload: true,
        waitForBuild: true,
      }),
    ],
  },
  extractCSS({ loaders: cssLoaders }),
]);
