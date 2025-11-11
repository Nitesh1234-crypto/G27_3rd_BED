const {WebSocketServer} = require("ws");
const wss= new WebSocketServer({port:8888});



//rooms functionality
let rooms= new Map();
// {
//     "1234":[s1,s2,s3]
// }
wss.on("connection",function(socket){
    console.log("a new user connected")
    socket.on("message",function(message){
        //{"type":"join"||"chat","Payload":{"roomId":"value"}}
        let parsedMessage= JSON.parse(message);
        if(parsedMessage.type=="join"){
            let roomId= parsedMessage.payload.roomId;
            console.log(rooms)
            
            if(!rooms.get(roomId)){
                // rooms.set(roomId, new Set())
                return socket.send("room id doesnot exist")
            }
            rooms.get(roomId).add(socket)
            socket.roomId= roomId;
            socket.send("you are added to room"+ " "+ roomId)
            console.log(rooms)

        }
        else if( parsedMessage.type=="chat"){
            let roomId= socket.roomId;
            let message= parsedMessage.payload.message;
            let allclients= rooms.get(roomId);
            allclients.forEach(s => {
                s.send(message)
            });

        }
        else if(parsedMessage.type=="create"){
            //create a room id and send it to user;
            let roomId = Math.floor(Math.random()*100000000).toString()
            rooms.set(roomId,new Set());
            console.log(rooms)
            socket.send(roomId)
        }

    })

})


