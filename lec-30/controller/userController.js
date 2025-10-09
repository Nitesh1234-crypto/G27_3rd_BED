const User = require("../service/userService")

module.exports.postUser= async (req,res)=>{
    let {name,email}= req.body;
   let message= await User.addUser(email,name)
   res.json({
    success:true,
    message:message
   })
}