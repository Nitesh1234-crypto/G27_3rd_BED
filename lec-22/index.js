const express = require("express");
const mongoose = require('mongoose');
const app = express();
const Blog= require("./model/blog")
const User= require("./model/user")
const jwt=require("jsonwebtoken")
app.use(express.urlencoded({extended:true}));
app.use(express.json());
//middleware to verify jwt token
function isLogin(req,res,next){
    let token= req.headers.authorization;
    if(!token){
        return res.json({
            success:false,
            message:"please provide token or login"
        })
    }
    let decode= jwt.verify(token,"lop");
    if(!decode){
        return res.json({
            success:false,
            message:"invalid token"
        })
    }
    req.userId= decode.userId
    next()
}
//create
app.post("/blogs",isLogin,async(req,res)=>{
    let title= req.body.title;
    let body= req.body.body;
    // let userId= req.body.userId;
    let userId= req.userId
     let user= await User.findById(userId);
     if(!user){
        return res.json({
            success:false,
            message:"Invalid user"
        })
     }
    let blog={
        title:title,
        body:body,
        date:Date.now(),
        userId:userId
    }
    let newBlog=new Blog(blog)
    await newBlog.save()
    user.blogs.push(newBlog._id)
    await user.save();
    res.json({
        success:true,
        message:"blog added successfully",
        data:newBlog
    })

})
app.delete("/blogs/:blogId",isLogin,async(req,res)=>{
    let blogId= req.params.blogId;
    let userId= req.userId;
    let blogExist= await Blog.findById(blogId);
    if(!blogExist){
        return res.json({
            success:false,
            message:"blog does not exist"
        })
    }
    if(blogExist.userId!=userId){
        return res.json({
            success:false,
            message:"permission denied"
        })
    }
    await Blog.findByIdAndDelete(blogId);

})
//Read
//read all data
//read single data
app.get("/blogs",async(req,res)=>{
   let allBlogs=await Blog.find();
   res.json({
    success:true,
    message:"all data fetched succesfully",
    data:allBlogs
   })
})
app.get("/blogs/:id",async(req,res)=>{
    let id = req.params.id;
    let blog= await Blog.findById(id);
    res.json({
        success:true,
        message:"blog fetched successfully",
        data:blog
    })
})
//signup
app.post("/users",async(req,res)=>{
    let email= req.body.email;
    let username= req.body.username;
    let password=req.body.password
   
    let user={
        email,
        username,
        password
    }
    let newUser=new User(user)
    await newUser.save()
    
    res.json({
        success:true,
        message:"user added succesfully",
        data:newUser
    })

})
app.get("/users",async(req,res)=>{
    let allusers= await User.find()
    res.json({
        success:true,
        data:allusers
    })
})
app.post("/login",async(req,res)=>{
    let {email,password}= req.body;
    let userExist= await User.findOne({email:email});
    if(!userExist){
        return res.json({
            success:false,
            message:"please signup"
        })
    }
    if(userExist.password!=password){
        return res.json({
            success:false,
            messahe:"Incorrect password"
        })
    }
    let token=jwt.sign({"userId":userExist._id},"lop")
    res.json({
        success:true,
        message:"Login successfull",
        token:token
    })
    
})
mongoose.connect('mongodb://127.0.0.1:27017/G27DBs')
  .then(() => console.log('Connected!'));
app.listen(5556,()=>{
    console.log("server started")
})