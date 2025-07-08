let file3=require("./file1");
console.log(file3);
let res=file3.add(2,3);
console.log(res);

function divide(a,b){
    return a/b;
}

module.exports.divide=divide