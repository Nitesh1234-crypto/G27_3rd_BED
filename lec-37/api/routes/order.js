const express= require("express");
const { postPlaceOrder } = require("../controller/order");
const router = express.Router();

router.post("/",postPlaceOrder);



module.exports=router;