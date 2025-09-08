const User= require("../model/user");
const jwt= require("jsonwebtoken");
module.exports.postLogin=async(req,res)=>{
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
    
}