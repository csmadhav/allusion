const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/app.js",
	devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.[t|j]s$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
    ]
  },
	devServer: {
    contentBase: "./dist",
    before: function(app) {
      app.post("/track", function(req, res) {
        res.json({"status":"success"});
      });
    }
	},
  resolve: {
    extensions: [ ".tsx", ".ts", ".js" ]
  },
  plugins: [
    new webpack.DefinePlugin({
          "APP_ENV": process.env.NODE_ENV || "development",
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/resources/test-website/index.html",
      inject:"body"
    })
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};
