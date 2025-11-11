const OrderBook = require("../service/orderbook");
const ob = new OrderBook("BTCUSD")
let {publisher} = require("../../shared/index");
module.exports.postPlaceOrder = async (req,res)=>{
    //user,quantity, type, price,side,symbol
    let {type,side, price,quantity,username} =req.body;
    //basic validation
  
    let response = ob.placeOrder(price,quantity,type,side,username);
    await publisher.connect();
    await publisher.PUBLISH("book:update",JSON.stringify(response.book))
    res.json(response);
}
//