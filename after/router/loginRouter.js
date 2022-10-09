//登录界面路由
const express = require("express");
const { adminuse } = require("../module/mongoes");
const md5 = require("md5");
const jwt = require('jsonwebtoken');
let router = express.Router();
router.post("/login", async (req, res) => {
  let usname = req.body.usname;
  let paswords = req.body.pasword;
  let pasword = md5(paswords);
  let result = await adminuse.find({ usname });
  let respas = result[0].pasword;
      // 后端签发token，借助一个模块
            // 第一个参数是 传递的参数值，可以传给前端
            // 第二个参数是 token的密码，不能随便给别人 ，如果有这个密码之后就可以反解密token
            // 第三个参数是 token的过期时间 2h 就是2个小时的过期时间
            let token = jwt.sign({ myvalue:"hehe" }, "mytoken", { expiresIn: '2h' })
  if(pasword==respas){
    res.json({
      info: "密码正确",
      token,
      status: 1
    })
  }
  else if(pasword!==respas){
    res.json({
      info: "密码或用户名错误",
      status: 0
    })
  }
  else {
    res.json({
      info: "用户名不存在错误",
      status: 2
    })
  }

})
module.exports=router