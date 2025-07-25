const express = require("express");
const fs=require("fs");
const { json } = require("stream/consumers");
const app = express();

app.use(express.json());
app.post("/users",(req,res)=>{
    let allUser=[];
    let name=req.body.name;
    let password=req.body.password;
    let user={name,password};
    fs.readFile("userdata.json","utf-8",function(err,data){
        if(err) return res.json({
            error:err
        })
        if(data && data.length>0){
           allUser =JSON.parse(data);
        }
        allUser.push(user);
        fs.writeFile("userdata.json",JSON.stringify(allUser),function(err){
            if(err) return res.send(err);
            res.send("user data")
        })
    })
    // allUser.push(user)
    // console.log(user)
    // fs.appendFile("./userdata.json",JSON.stringify(allUser),function(err){
    // if(err) return res.send(err);
    // res.send("user added")
// })
// res.json({
//     name:name,
//     password:password
// })
})

app.listen(3333,()=>{
    console.log("server started")
})