const fs = require("fs");


fs.writeFile("../demo2.txt","hello world", function(err){
    if(err) return console.log(err);
    console.log("success!!")
})