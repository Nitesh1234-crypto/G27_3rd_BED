const fs = require("fs");
const { read } = require("../IO/io.js");

// fs.readFile("../users.txt","utf-8",function(err,data){
//     if(err) return console.log(err);
//     // console.log(data[0])
//     let users =JSON.parse(data)
//     console.log(users[0])

// })
async function readusers(){
let users=await read("../users.txt")
let users2 = await read("../users2.txt");
console.log(users)
console.log(users2)
}
readusers();