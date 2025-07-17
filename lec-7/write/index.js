const fs = require("fs")
let users=[
    {
        id:1,
        name:"Pratiyush",
        age:"26"
    },
     {
        id:2,
        name:"Pranav",
        age:"29"
    },
]

fs.writeFile("../users2.txt",JSON.stringify(users),function(err){
    if(err) return console.log(err);
    console.log("users written")
})