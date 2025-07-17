const fs= require("fs");
const { read, write } = require("../IO/io");

// fs.readFile("../users.txt","utf-8",function(err,data1){
//     if(err) return console.log(err);
//     let user1=JSON.parse(data1)
//     console.log(user1)
//     fs.readFile("../users2.txt","utf-8",function(err,data2){
//         if(err) return console.log(err)
//             let user2=JSON.parse(data2)
//             console.log(user2)
//             let allusers= user1.concat(user2);
//             console.log(allusers)
//             fs.writeFile("./allUSers.txt",JSON.stringify(allusers),function(err){
//                 if(err) return console.log(err);
//                 console.log("work completed")
//         });
//     });
// });

async function task(file1,file2,file3){
   let user1=await read(file1);
   console.log(user1)
   let user2=await read(file2);
//    let a=JSON.parse(user1);
//    let b= JSON.parse(user2);
   let allusers = user1.concat(user2);
   let mes= await write(file3,JSON.stringify(allusers));
   console.log(mes)

}
task("../users.txt","../users2.txt","./allusers2.txt")