import user from "@/users.ejs"
import axios from "../api/api";
let baseurl = axios.defaults.baseURL;

async function getrender (res,num) {
  let resresult  = await axios.post("/admin/getdata",{num});
  let result=resresult.data
  let userdata = result.alldata;
  let length = result.length;
  res.render(user({userdata,baseurl,length}))
}
async function addevent (res) {
  let add = document.querySelector(".adduer");
  let adduser = document.querySelector(".adduermodel");
  let close = document.querySelector(".closebtn");
  let mask = document.querySelector(".mask");
  let filesbtn = document.querySelector(".fileinput-button");
  let imgfile = document.querySelector(".imgFile");
  let imgshow = document.querySelector(".imgshow");
  let btn = document.querySelector(".btn");
  let username = document.querySelector(".username");
  let pwd = document.querySelector(".pwd");
  let repeatpwd = document.querySelector(".repeatpwd");
  add.onclick = function () {
    adduser.style.display = "block";
    mask.style.display = "block";
  }
  close.onclick = function () {
    adduser.style.display = "none";
    mask.style.display = "none";
  }
  filesbtn.onchange = function () {
    let files = imgfile.files[0];
    let filesread = new FileReader();
    filesread.readAsDataURL(files);
    filesread.onload = function () {
      imgshow.innerHTML = ' ';
      let simg = document.createElement("img");
      simg.src = filesread.result;
      simg.style.height = "100px";
      simg.style.width = "100px";
      imgshow.appendChild(simg);
    }
  }
  btn.onclick = async function () {
    if (username.value) {
      if (repeatpwd.value==pwd.value) {
        let imgurl = imgfile.files[0];
      let formdata = new FormData();
      formdata.append("usname",username.value)
      formdata.append("pasword",pwd.value)
      formdata.append("imgul", imgurl)
      let resresult = await axios.post("/admin/adduser", formdata);
      if (resresult.status == '200') {
        alert("添加成功")
        adduser.style.display = "none";
        mask.style.display = "none";
        await getrender(res); // 调用ajax 获取最新的数据，然后再渲染到页面上
        await addevent(res);
     }
      }
      else {
        alert("两次输入的密码不一样");
      }
    }
    else {
      alert("不能为空");
    }
}
let deletebtn = document.querySelectorAll('.delBtn');
deletebtn.forEach((item,index )=> {
  item.onclick =async function () {
    let id = item.getAttribute('att');
    let result = await axios.post("/admin/delete", {"id":id,"num":index});
    console.log(result);
    await getrender(res);
    await addevent (res)
  }
})
  let skipbtn = document.querySelectorAll(".perpage");
  skipbtn.forEach((item, index) => {
    item.onclick = async function () {
      let num = index + 1;
      await getrender(res,num);
      await addevent(res);
    }
  })
 
  
}




export default function (router) {
  router.route("/admin/user", async (req, res) => {
    await getrender(res);
    await addevent(res);
    let loginout = document.querySelector(".loginout");
    loginout.onclick = function () {
      localStorage.removeItem('token');
      router.go('/login');
    }
  })
}