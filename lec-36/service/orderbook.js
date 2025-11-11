
class OrderBook{
    constructor(symbol){
        this.symbol=symbol;
        this.bids=[];
        this.ask=[];
        this.currentPrice=null;
        this.trades=[]
    }
    _sort(side){
        if(side=="BUY"){
            console.log("aaaaaaaaaaaaa")
           this.bids.sort((a,b)=>{
              if(a.price!=b.price){
                console.log("bbbbbbbbbbb")
               return b.price-a.price //sort according to price
              }
             return a.timeStamp-b.timeStamp; //sort according to time
           }) //lexiographically
        }
         else{
           this.ask.sort((a,b)=>{
              if(a.price!=b.price){
               return a.price-b.price //sort according to price
              }
             return a.timeStamp-b.timeStamp; //sort according to time
           }) //lexiographically
        }
    }

    placeOrder(price,quantity,type,side,userName){
        let newOrder={
            symbol : this.symbol,
            orderId : Math.floor(Math.random()*1000000),
            side:side,
            type:type,
            price:price || null,
            originalQty:quantity,
            executedQty:0,
            remainigQty:quantity,
            user:userName,
            timeStamp: Date.now()
        }
        let trades=[]
        if(newOrder.type=="LIMIT"){
            let [order,trade] = this._LimitMatch(newOrder,trades);
            if(order.remainigQty>0){
                if(order.side=="BUY"){
                    this.bids.push(order)
                }else{
                    this.ask.push(order)
                }
                this._sort(order.side)

            }
            if(trade){
                this.trades=[...this.trades,...trade]
            }

        }else{
            let [order,trade]= this._MarketMatch(newOrder,trades);
            if(trade){
                this.trades=[...this.trades,...trade]
            }
            if(order.remainigQty>0){
                console.log("order complete" + " "+ order.executedQty +"," +"orderCancel"+order.remainigQty);
            }else{
            console.log("order completed"+order.executedQty)
            }
        }

    }
    _LimitMatch(order,trade){
        if(order.side=="BUY"){
            //115 buy 10, 110,111,115
            let askArr= this.ask;
            while(order.remainigQty>0 && askArr.length>0){
                let top= askArr[0];
                if(top.price<=order.price){
                    let buyQuantity= Math.min(top.remainigQty,order.remainigQty);
                    this.currentPrice= top.price;
                   trade.push([buyQuantity,top.price])
                    
                    //update --> order
                    order.executedQty +=buyQuantity;
                    order.remainigQty -=buyQuantity;
                    

                    top.executedQty +=buyQuantity;
                    top.remainigQty -=buyQuantity;

                    if(top.remainigQty==0){
                        askArr.shift();
                    }
                }else{
                   break;  
                }
               
                
            }
            return [order,trade];
        }
        else if(order.side=="SELL"){
             let bidArr= this.bids;
            while(order.remainigQty>0 && bidArr.length>0){
                let top= bidArr[0];
                if(top.price>=order.price){
                    let buyQuantity= Math.min(top.remainigQty,order.remainigQty);
                    this.currentPrice=top.price
                    trade.push([buyQuantity,top.price])
                    //update --> order
                    order.executedQty +=buyQuantity;
                    order.remainigQty -=buyQuantity;
                    console.log(order.remainigQty)

                    top.executedQty +=buyQuantity;
                    top.remainigQty -=buyQuantity;

                    if(top.remainigQty==0){
                        bidArr.shift();
                    }
                }else{
                   break;  
                }
               
                
            }
            return [order,trade];

        }else{
            return "Invalid order side"
        }
    }
    _MarketMatch(order,trade){
        // chech side of order 
        /*if its buy 
         start buy from ask array from 0th index 
         until order.remainingQTY>0
         fullfiledQTY= Math.min(order.remainingQTY,top,remainingQTy)
                 */

         if(order.side==="BUY"){
            let askArr= this.ask;
            while(order.remainigQty>0 && askArr.length>0){
                let top = askArr[0];
                let fullfiledQTY= Math.min(order.remainigQty,top.remainigQty);
                this.currentPrice=top.price;
                trade.push([fullfiledQTY,top.price])
                //update order from both side
                order.executedQty+=fullfiledQTY;
                order.remainigQty-=fullfiledQTY;

                top.remainigQty-=fullfiledQTY;
                top.executedQty+=fullfiledQTY;
                if(top.remainigQty==0){
                    askArr.shift()
                }
            }
            return [order,trade];
         }
         else if(order.side==="SELL"){
            let bidArr= this.bids;
            while(order.remainigQty>0 && askArr.length>0){
                let top = bidArr[0];
                let fullfiledQTY= Math.min(order.remainigQty,top.remainigQty);
                this.currentPrice=top.price;
                trade.push(fullfiledQTY,top.price)
                //update order from both side
                order.executedQty+=fullfiledQTY;
                order.remainigQty-=fullfiledQTY;

                top.remainigQty-=fullfiledQTY;
                top.executedQty+=fullfiledQTY;
                if(top.remainigQty==0){
                    bidArr.shift()
                }
            }
            return [order,trade];
         }
    }
    getPrice(){
        return this.currentPrice
    }
    getBookSnapShot(){
        return{
            "ask":this.ask.map((a)=> [a.price,a.remainigQty]),
            "bids":  this.bids.map((b)=> [b.price,b.remainigQty])
        }
    }
    getLatestTrade(){
        return this.trades;
    }
  
}

let BTCUSDOrderBook= new OrderBook("BTC_USD");
// BTCUSDOrderBook.bids.push({price:100,quantity:10,type:"LIMIT",user:"Nitesh"})
// BTCUSDOrderBook.bids.push({price:101,quantity:10,type:"LIMIT",user:"Ritik"})
// BTCUSDOrderBook.bids.push({price:99,quantity:10,type:"LIMIT",user:"Nitesh"})
// console.log(BTCUSDOrderBook);
// BTCUSDOrderBook._sort("BUY");
// console.log(BTCUSDOrderBook.bids);

// BTCUSDOrderBook.ask.push({price:"105",quantity:5,type:"LIMIT",user:"Nitesh"})
// BTCUSDOrderBook.ask.push({price:"102",quantity:10,type:"LIMIT",user:"Ritik"})
// BTCUSDOrderBook.ask.push({price:"110",quantity:10,type:"LIMIT",user:"Nitesh"})
// BTCUSDOrderBook._sort("SELL")
// console.log(BTCUSDOrderBook);


//if a function start with underscore ( _ )

BTCUSDOrderBook.placeOrder("100",5,"LIMIT","BUY","Nitesh");
BTCUSDOrderBook.placeOrder("101",10,"LIMIT","BUY","Nitesh");
BTCUSDOrderBook.placeOrder("99",5,"LIMIT","BUY","Nitesh");
console.log(BTCUSDOrderBook.getBookSnapShot());
console.log(BTCUSDOrderBook.getLatestTrade());
BTCUSDOrderBook.placeOrder("102",5,"LIMIT","SELL","Nitesh");
BTCUSDOrderBook.placeOrder("103",5,"LIMIT","SELL","Nitesh");
BTCUSDOrderBook.placeOrder("104",5,"LIMIT","SELL","Nitesh");
console.log(BTCUSDOrderBook.getBookSnapShot());
console.log(BTCUSDOrderBook.getLatestTrade());
BTCUSDOrderBook.placeOrder("101",3,"LIMIT","SELL","Nitesh");
console.log(BTCUSDOrderBook.getPrice())
BTCUSDOrderBook.placeOrder(null,10,"MARKET","BUY","Nitesh")
console.log(BTCUSDOrderBook.getPrice())
console.log(BTCUSDOrderBook.getBookSnapShot());
console.log(BTCUSDOrderBook.getLatestTrade());




// this.trade = [2,4,55];

// trade=[8,9];

// this.trades=[...this.trade,...trade];
// this.trade=[8,9]