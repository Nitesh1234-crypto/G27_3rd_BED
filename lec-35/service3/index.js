const {createClient} = require("redis");
let subscriber= createClient();

async function notifyMe(){
    await subscriber.connect();
    await subscriber.SUBSCRIBE("notify_me",(data)=>{
        console.log(data)
    });
    await subscriber.SUBSCRIBE("like",function(data){
        console.log(data)
    })
}
notifyMe()


