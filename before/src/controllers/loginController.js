
import login from "@/login.ejs"
import axios from "../api/api";
export default function (router) {
  router.route("/login",async (req, res) => {
   await res.render(login());
    await addevent(res);
  })
  async function addevent (res) {
    let name = document.querySelector("#name");
    let pwd = document.querySelector("#pas");
    let btn = document.querySelector(".submit");
      btn.onclick =async function (e) {
        e.preventDefault();
        name = name.value;
        pwd = pwd.value;
        let resdatas = await axios.post("/login", { "usname":name, "pasword":pwd });
        let resdata=resdatas.data
        if (resdata.status == "1") {
          localStorage.setItem("token",resdata.token);
          router.go("/admin");
        }
        else  if (resdata.status == "2"){
          alert(resdata.info);
          await res.render(login());
        }
        else {
          alert(resdata.info);
          await res.render(login());
        }
    }
  }
}