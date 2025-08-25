const express = require("express");
const mongoose = require('mongoose');
const app = express();
const Blog= require("./model/blog")
const User= require("./model/user")
app.use(express.urlencoded({extended:true}));
app.use(express.json());
//create
app.post("/blogs",async(req,res)=>{
    let title= req.body.title;
    let body= req.body.body;
    let userId= req.body.userId;
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
app.delete("/blogs/:blogId",async(req,res)=>{
    let blogId= req.params.blogId;
    let userId= req.body.userId;
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

mongoose.connect('mongodb://127.0.0.1:27017/G27DBs')
  .then(() => console.log('Connected!'));
app.listen(5556,()=>{
    console.log("server started")
})