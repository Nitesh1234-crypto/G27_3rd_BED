let {WebSocketServer}=require("ws")
let wss= new WebSocketServer({port:4001});
let {subscriber}= require("../shared/index");
let allScoket= []
wss.on("connection",(socket)=>{
    console.log("new user connected")
    allScoket.push(socket)
    async function bookUpdate(){
        subscriber.connect()
        .then(()=>console.log("subscriber client connected"))
       
        subscriber.SUBSCRIBE("book:update",(message)=>{
            // console.log(message)
            broadcast(message)
        })
    }
    bookUpdate()

})
function broadcast(data){
  allScoket.forEach((s)=>{
    s.send(data);
  })
}