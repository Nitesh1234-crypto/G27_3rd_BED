let {WebSocketServer}=require("ws")
let wss= new WebSocketServer({port:4001});
let {subscriber}= require("../shared/index");

wss.on("connection",(socket)=>{
    console.log("new user connected")
    async function bookUpdate(){
        await subscriber.connect();
        subscriber.SUBSCRIBE("book:update",(message)=>{
            console.log(message)
        })
    }
    bookUpdate()

})