const express= require("express");
const { postUser } = require("../controller/userController");
const router= express.Router();


router.post("/addUser",postUser)

module.exports=router;