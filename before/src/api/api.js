const axios = require("axios").default;
let request = axios.create({
  timeout:5000,
  baseURL:"/api"
})
//签发token
request.interceptors.request.use(config=>{
  let token = localStorage.getItem("token");
  config.headers['Authorization'] = 'Bearer ' + token
  return config;
})
export default request;