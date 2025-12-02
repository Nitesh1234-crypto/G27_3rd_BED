const express= require("express");
const app = express();
const User= require("./model/user.schema")
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post("/api/users/register",async (req,res)=>{
    const {name, email,password} = req.body;
    const userExist= await User.findOne({email});
    if(userExist){
        return res.json({
            success:false,
            message:"User already exist"
        })
    }
    let newUser = await User.create({
        name:name,
        email:email,
        password:password
    })
    res.json({
        success:true,
        message:"user registered successfully!!",
        data: newUser
    })
})


module.exports=app;
