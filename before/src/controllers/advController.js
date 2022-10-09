import adv from "@/adv.ejs"
import axios from "../api/api";
let baseurl = axios.defaults.baseURL;
async function addevent(res) {
  let addadv = document.querySelector(".addadv");
  let adduermodel = document.querySelector(".adduermodel");
  let mask = document.querySelector(".mask");
  let username = document.querySelector(".username");
  let imgfile = document.querySelector(".imgFile");
  let imgshow = document.querySelector(".imgshow");
  let closebtn = document.querySelector(".closebtn");
  let delBtn = document.querySelectorAll(".delBtn");
  let btn = document.querySelector(".btn");
  let page = document.querySelectorAll(".perpage");
  
  addadv.onclick = function () {
    adduermodel.style.display = "block";
    mask.style.display = "block";
  }
  imgfile.onchange = function () {
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
  btn.onclick =async function () {
    let imgurl = imgfile.files[0];
    let advname = username.value;
    let form = new FormData();
    form.append("advname", advname);
    form.append("imgurl", imgurl);
    await axios.post("/admin/postdata", form);
    await renderdata(res);
    await addevent(res);

    
  }
  closebtn.onclick = function () {
    adduermodel.style.display = "none";
    mask.style.display = "none";
  }
  delBtn.forEach((item, index) => {
    item.onclick =async function () {
      let _id = item.getAttribute("att");
      let deletres = await axios.post("/admin/adv/delete", {_id,"num":index});
      console.log(deletres);
      await renderdata(res);
      await addevent(res);
    }
  })
  page.forEach((item, index) => {
    item.onclick = async function () {
      let num = index + 1;
      await renderdata(res,num);
      await addevent(res);
    }
  })
  //修改按钮
  let update = document.querySelectorAll(".update");
  update.forEach((item, index) => {
    item.onclick = function () {  
    }
  })
}
async function renderdata (res,num) {
  let advres = await axios.get("/admin/getdata",{params:{num}});
  let advdatas = advres.data;
  let length = advdatas.length;//数据库中数据长度
  let advdata = advdatas.advdatas;//广告的数据的数组
  res.render(adv({advdata,length,baseurl}));
}
export default function (router) {
  router.route("/admin/adv",async (req, res) => {
    await renderdata(res);
    await addevent(res);
    let loginout = document.querySelector(".loginout");
    loginout.onclick = function () {
      localStorage.removeItem('token');
      router.go('/login');
    }
  })
 
}