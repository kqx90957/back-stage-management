//开发环境的webpack配置文件
//导入生产环境
let prodct = require("./webpack.config.prod");

module.exports = {
  ...prodct,
  mode: "development",
    devServer: {
      open: true,  // 自动开启浏览器
      port: 8080,   // 端口
      liveReload: true,//启动自动更新
  }
   
}