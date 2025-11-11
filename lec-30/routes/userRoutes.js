const express= require("express");
const { postUser,getProfile } = require("../controller/userController");
const router= express.Router();


router.post("/addUser",postUser);
router.get("/profile",getProfile)


module.exports=router;