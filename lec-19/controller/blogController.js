const User=require("../model/user")
const Blog= require("../model/blog")
module.exports.postAddBlog=async(req,res)=>{
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

}


module.exports.deleteOneBlog=async(req,res)=>{
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

}

module.exports.getAllBlog=async(req,res)=>{
   let allBlogs=await Blog.find();
   res.json({
    success:true,
    message:"all data fetched succesfully",
    data:allBlogs
   })
}

module.exports.getOneBlog=async(req,res)=>{
    let id = req.params.id;
    let blog= await Blog.findById(id);
    res.json({
        success:true,
        message:"blog fetched successfully",
        data:blog
    })
}