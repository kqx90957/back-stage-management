const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/adminuser", err=> {
  if (err) {
    console.log(err);
}
  console.log("数据库连接成功");
})
let schema = mongoose.Schema({
  usname: String,
  pasword: String,
  data: String,
  imgname:String
})
let schemaadv = mongoose.Schema({
  advname: String,
  data: String,
  imgname:String,
})
const adminuse = mongoose.model("users", schema);
let adminadv=mongoose.model("adv",schemaadv)
module.exports = {adminuse,adminadv};