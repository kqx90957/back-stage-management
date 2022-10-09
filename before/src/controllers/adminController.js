import admin from "@/admin.ejs";

export default function (router) {
  
  router.route("/admin", (req, res, next) => {
    next(admin({ subRoute: res.subRoute(), clickStyle:req.url}))
    let lis = document.querySelectorAll(".menu-left ul li");
    lis.forEach((item, index) => {  
      item.onclick = function () {  
        if (index == 0) {
           router.go('/admin/user')
        }
        else if (index = 1) {
          router.go('/admin/adv')
        }
      }
   })



  
  }) 
}