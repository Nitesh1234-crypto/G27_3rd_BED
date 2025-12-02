const OrderBook = require("../service/orderbook");

const {publisher} = require("../../shared/index")


module.exports.postPlaceOrder = async (req,res)=>{
    //user,quantity, type, price,side,symbol
    let {type,side, price,quantity,username,symbol} =req.body;
    //basic validation
    let ob = OrderBook.getOrderBook(symbol)
    console.log(ob)
    let response = ob.placeOrder(price,quantity,type,side,username,symbol);
    publisher.PUBLISH("book:update",JSON.stringify(response.book))
    res.json(response);
}
//