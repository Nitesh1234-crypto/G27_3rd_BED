const User= require("../model/user")
module.exports.postAddUser=async(req,res)=>{
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

}

module.exports.getAllUsers=async(req,res)=>{
    let allusers= await User.find()
    res.json({
        success:true,
        data:allusers
    })
}