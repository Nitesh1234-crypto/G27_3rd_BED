const express = require("express");
const mongoose = require('mongoose');
const app = express();
const Blog= require("./model/blog")
const User= require("./model/user")
const jwt=require("jsonwebtoken")
app.use(express.urlencoded({extended:true}));
app.use(express.json());
//middleware to verify jwt token

//create

//signup

mongoose.connect('mongodb://127.0.0.1:27017/G27DBs')
  .then(() => console.log('Connected!'));
app.listen(5556,()=>{
    console.log("server started")
})