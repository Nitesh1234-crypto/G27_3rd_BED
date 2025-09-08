const express = require("express");
const mongoose= require("mongoose")
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
let jwt= require("jsonwebtoken")
const Blogs= require("./model/blog");
const user = require("./model/user");
//middleware to verify token
function isLogin(req,res,next){
  let token = req.headers.authorization;
  if(!token){
    return res.json({
      success:false,
      message:"No token provide, please login"
    })
  }
  let decode = jwt.verify(token,"meww");
  if(!decode){
    return res.json({
      success:false,
      message:"Invalid token"
    })
  }
  req.userId= decode.userId
  next()
}
//adding a blog to database
app.post("/blogs",isLogin,async(req,res)=>{
  let {title,body}  = req.body;
  let userId= req.userId
  let userExist= await user.findById(userId);
  if(userExist){
   let newBlog=new Blogs({
    title:title,
    body:body,
    date: Date.now(),
    userId:userId
   })
  await newBlog.save()
  userExist.blogs.push(newBlog._id)
  await userExist.save();
  res.json({
    success:true,
    data:newBlog,
    message:"blog added successfully"
  })
}
})
//getting all blog
app.get("/blogs",async(req,res)=>{
   let allblog= await Blogs.find();
   res.json({
        success:true,
        data:allblog
   }) 
})
//gettting single blog
app.get("/blogs/:id",async(req,res)=>{
    let {id}= req.params
    let blog= await Blogs.findOne({_id:id});
    res.json({
        success:true,
        data:blog
    })
})
//user -->register
app.post("/users",async(req,res)=>{
  let {username,email,password}  = req.body;
   let newUser=new user({
    username,
    email,
    password
   })
  await newUser.save()
  res.json({
    success:true,
    data:newUser,
    message:"blog added successfully"
  })
})
app.get("/users",async(req,res)=>{
   let allusers= await user.find();
   res.json({
        success:true,
        data:allusers
   }) 
})
app.get("/users/:id",async(req,res)=>{
    let {id}= req.params
    let userExist= await user.findOne({_id:id}).populate("blogs")
    if(userExist){
    res.json({
        success:true,
        data:userExist
    })
  }
})


//delete blog ---->userId
app.delete("/blogs/:blogId",isLogin,async(req,res)=>{
  let {blogId}= req.params;
  let  userId= req.userId;
  let blogExist = await Blogs.findById(blogId);
  if(!blogExist) return res.json({
    success:false,
    message:"Blog doest not exist"
  })
  if(blogExist.userId!=userId) return res.json({
    success:false,
    message:"You are not allowed to delete this blog"
  })
  await Blogs.findByIdAndDelete(blogId);
  console.log("aaaaaaaaaaaaaaaaaaaaaa")
  let userExist = await user.findById(userId);
  let blog= userExist.blogs.filter((id)=> id!=blogId)
  userExist.blogs=blog
  await userExist.save();
  console.log("bbbbbbbbbbbbbbb")
  res.json({
    success:true,
    message:"blog deleted successfully",
    data:userExist
  })
})
app.post("/login",async(req,res)=>{
  let {email,password} = req.body;
  let userExist= await user.findOne({email:email});
  if(!userExist){
    return res.json({
      success:false,
      message:"please signup"
    })
  }
  if(userExist.password!=password){
    return res.json({
      success:false,
      message:"Incorrect password"
    })
  }
  let token=jwt.sign({"userId":userExist._id},"meww");
  res.json({
    success:true,
    message:"login successfull",
    token:token
  })
})


app.listen(4455,()=>{
    console.log("server started")
})
mongoose.connect('mongodb://127.0.0.1:27017/g26DB')
  .then(() => console.log('Connected!'));