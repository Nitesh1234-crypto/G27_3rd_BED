const express= require("express");
const router= express();
const {isLogin}= require("../middleware/auth")
const {postAddBlogs,deleteOneBlog,getAllBlogs,getOneBlog}= require("../controller/blogController")
router.post("/",isLogin,postAddBlogs)
router.delete("/:blogId",isLogin,deleteOneBlog)
//Read
//read all data
//read single data
router.get("/",getAllBlogs)
router.get("/:id",getOneBlog)


module.exports=router