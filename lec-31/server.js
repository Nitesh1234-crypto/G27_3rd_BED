const { WebSocketServer } = require('ws');
const wss = new WebSocketServer({ port: 8080 });

// wss.on("connection",function(socket){
//     console.log("a new user connected")
//     socket.send("welcome !!!")
//     setInterval(()=>{
//         socket.send("Reliance stock price is"+ " " + Math.random())
//     },1000)
// })

// wss.on("connection",function(socket){
//     console.log("a new user connected")
//     socket.send("welcome !!!")
//     socket.on("message",function(message){
//         console.log(message.toString())
//         if(message.toString()==="ping"){
//             socket.send("pong")
//         }else{
//             socket.send("you have not send a ping message")
//         }

//     })
   
// })
//broadcasting
let allSockets=[]
wss.on("connection",function(socket){
    console.log("user connected");
    allSockets.push(socket)
//    console.log(allSockets)
    socket.on("message",function(message){
        allSockets.forEach((s)=>{
            s.send(message.toString())
        })
    })
   
})










//express=require("express");
//app= express();
//app.listen(3000)

//app.get("/",(req,res)=>{
// })
//app.post("/users")