//广告界面路由
const express = require("express");
const { adminadv } = require("../module/mongoes");
const {adminuse} = require("../module/mongoes");
const { upfiles } = require("../until/formidable");
const fs = require("fs");
let router = express.Router();
let perpage = 2;//每页显示的数量
router.post("/postdata",async (req, res) => {
  let result = await upfiles(req);
  result.data = new Date().toLocaleDateString();
  await adminadv.create(result);

  res.json("添加数据库成功");
})
router.get("/getdata", async (req, res) => {
  let length = (await adminadv.find()).length;
  length = Math.ceil(length / perpage);
  let result =1 ;
  let ress = req.query.num;
  result = ress;
  let advdatas = await adminadv.find().skip((result-1)*perpage).limit(perpage);
  res.json({advdatas,length});
})
router.post("/adv/delete", async (req, res) => {
  let _id = req.body._id;
  await adminadv.deleteOne({ _id });
  //处理删除后端的文件
  // let length = (await adminuse.find()).length;
  // console.log(length);
  // fs.readdir("./static", (err,files) => {
  //   if (err) {
  //     console.log('err');
  //   }
  //  console.log(files[index]);
  //  fs.unlink(`./static/${files[index]}`, err => {
  //    if (err) {
  //     console.log("err");
  //   }
  //  })
  // })
  res.json("成功");
})
router.post("/adv/updata", async (req, res) => {
  let _id = req.body._id;
  // await adminadv.deleteOne({ _id });
  // let result = await upfiles(req);
  // result.data = new Date().toLocaleDateString();
  // await adminadv.create(result);
  // console.log(result);
  res.json("修改成功");

})
module.exports = router;