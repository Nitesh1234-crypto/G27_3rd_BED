const {createClient}=require("redis");
let publisher= createClient();
let subscriber = createClient();


module.exports={
    publisher,
    subscriber,
}