const express = require("express");
const { upfiles } = require("../until/formidable")
const {adminuse} = require("../module/mongoes");
const fs = require("fs");
const md5 = require("md5");
let router = express.Router();
let parpage = 3//每页显示的用户数
router.post("/adduser", async (req, res) => {
  try {
    let result = await upfiles(req);
    result.pasword = md5(result.pasword);
    result.data = new Date().toLocaleDateString();
    await adminuse.create(result);;
    res.json({
      info:"添加成功"
    })
  }
  catch {
    res.json({
      info:"添加失败"
    })
}
})
router.post("/getdata", async (req, res) => {
  let result = 1;
  let ress = req.body.num;
  result = ress;
  let length = (await adminuse.find()).length;
  length = Math.ceil(length / parpage);
  let alldata = await adminuse.find().skip((result-1)*parpage).limit(parpage);
    res.json({alldata,length})
})

router.post("/delete", async (req, res) => {
  let _id = (req.body).id
  let index = (req.body).num
 await adminuse.deleteOne({ _id });
 fs.readdir("./static", (err,files) => {
    if (err) {
      console.log('err');
    }
   console.log(files[index]);
   fs.unlink(`./static/${files[index]}`, err => {
     if (err) {
      console.log("err");
    }
   })
  })
  res.json("ok")
})




module.exports = router;