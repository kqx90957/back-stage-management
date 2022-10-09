
module.exports={
upfiles (req) {
const formidable = require("formidable");
const path=require("path")
let form = new formidable.IncomingForm({
  uploadDir:path.resolve(process.cwd(), "./static"),  // 上传文件存储的路径
  keepExtensions:true   // 保持之前上传文件的后缀名称
});
    return new Promise((resolve, rejects) => {
      
      form.parse(req, (err, fields, files) => {
        if (err) {
          return console.log("错误"); // 如果有错误 就抛出错误
        }
        let imgname = files.imgurl.newFilename;
        resolve({...fields, imgname});
      })
     
    })
  }
}