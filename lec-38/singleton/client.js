const Principal = require("./Principak");

function suspendStudent(name){
    let principal = new Principal("Nitesh");
    principal.suspend(name);
}
function removeSuspension(name){
    let principal = new Principal("Shubham");
    principal.removeSuspension();
}