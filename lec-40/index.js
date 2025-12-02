const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.post("/sum",(req,res)=>{
    let {a,b} = req.body;
    if(!a || !b){
        return res.json({
            success:false,
            message:"Invalid argument"
        })
    }
    res.json({
        success:true,
        data:a+b
    })
})
module.exports = app;
// app.listen(7687,()=>{
// console.log('server started')
// })