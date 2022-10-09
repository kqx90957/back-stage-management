//生产环境的配置webpack文件
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
  mode: "production",
  entry: path.resolve(process.cwd(), "./before/src/index.js"), // 入口文件
  output: {
    path: path.resolve(process.cwd(), "./before/dist"),
    filename: "[name].js",
    publicPath:'/'
  },
  module: {
    rules: [{
      test: /\.html$/i,
      loader: "html-loader",
    },
    {
      test: /\.ejs$/,
      loader: "ejs-loader",
      options: {
        variable: "data"
      }
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "my app",
      filename: "index.html",
      template: "./before/public/index.html"
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: "./before/public",
        to: "./",
        globOptions: {
          ignore: ["**/index.html"]
        }
      },
      {
        from: "./before/src/static",
        to: "./"
      },
      ]
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "./before/src/views")
    }
  }
}