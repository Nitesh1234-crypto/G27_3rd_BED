const express= require("express");
const router= express();
const {postAddUser,getAllUsers}= require("../controller/userController")
router.post("/",postAddUser)
router.get("/",getAllUsers)


module.exports=router;