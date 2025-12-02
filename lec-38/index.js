console.log("start")
async function task(){
    console.log("first");
    Promise.resolve("finish").then((data)=>console.log(data))
    console.log("second");
    return "hi"
}
task()
.then((data)=>console.log(data))
console.log("end");