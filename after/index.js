const express = require("express");
const bodyParser=require("body-parser")
let adduser = require("./router/userRouter");
let login = require("./router/loginRouter");
let adv = require('./router/advRouter');
const { expressjwt } = require("express-jwt");
let app = express();
app.use(expressjwt({secret:"mytoken",algorithms:['HS256']}).unless({path:[/\.png$/,'/login'] }))
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static("static"));
app.use("/admin",adduser)
app.use(login);
app.use("/admin",adv)


app.listen(8989);