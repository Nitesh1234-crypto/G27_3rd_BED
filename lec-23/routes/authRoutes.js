const express= require("express");
const router= express()
let {postLogin}=require("../controller/authController")
router.post("/login",postLogin)





module.exports=router;