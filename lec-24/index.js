const express = require("express");
const mongoose = require('mongoose');
const app = express();
app.use(express.static(__dirname+"/public"))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/api/blogs",require("./routes/blogRoutes"));
app.use("/api/users",require("./routes/userRoutes"));
app.use("/api/auth",require("./routes/authRoutes"))

mongoose.connect('mongodb://127.0.0.1:27017/G27DBs')
  .then(() => console.log('Connected!'));
app.listen(5556,()=>{
    console.log("server started")
})