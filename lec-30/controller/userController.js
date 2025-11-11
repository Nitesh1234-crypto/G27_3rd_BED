const User = require("../service/userService")

module.exports.postUser= async (req,res)=>{
    let {name,email}= req.body;
   let message= await User.addUser(email,name)
   res.json({
    success:true,
    message:message
   })
}

module.exports.getProfile= async (req,res)=>{
    let userId= req.userId;
    let userDetail =await User.getProfile(userId);
    res.json({
        success:true,
        data:userDetail
    })

}