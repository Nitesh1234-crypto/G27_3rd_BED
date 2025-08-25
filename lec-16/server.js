const express = require("express");
const app = express();
app.use(express.static(__dirname+"/public"));
app.use(express.json());
app.use(express.urlencoded());
app.post("/user",(req,res)=>{
    console.log("aaaaa")
    try {
        let email=req.body.email;
    let password=req.body.password;
    console.log(email,password);
    res.json({
        success:true,
        message:"user added successfully",
        data:{
            email,
            password
        }
    })
    } catch (error) {
       res.json({
        success:false,
        message:error.message
       }) 
    }
    
})
app.listen(3303,()=>{
    console.log("server started")
})