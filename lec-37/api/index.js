const express = require("express");
const app = express();
app.use(express.json());

app.use("/api/v1/order",require("./routes/order"))




app.listen(4000,()=>{
    console.log("server started");
})

