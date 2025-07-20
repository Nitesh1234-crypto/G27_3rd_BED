const express = require("express");
const app = express();

app.get("/",(req,res)=>{
     console.log(req);
    //  res.send("hello world")  //text  
    //  res.send("<h1>hello world</h1>")  //html
    res.json({
        name:"Nitesh",
        address:"delhi",
        isLogin:true
    }) 
})
//path param/variable!
//1.params
app.get("/users/:id",(req,res)=>{
    console.log(req.params.id);
    let id=req.params.id;
    res.send(id);
})
//2. query parameter;
app.get("/blogs",(req,res)=>{
    console.log(req.query.title);
    console.log(req.query.desc);
    res.send("got it")

})

app.listen(2222,()=>{
    console.log("server started");
})