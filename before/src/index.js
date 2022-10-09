//主要的js文件打包入口

import SMERouter from "sme-router"
const router = new SMERouter('app',"html5"); // 填写路由显示的位置id ,路由需要一个容器
import loginController from "./controllers/loginController"
loginController(router);
import adminController from "./controllers/adminController"
adminController(router);
import userController from "./controllers/userController";
userController(router);
import advController from "./controllers/advController";
advController(router);
