//event
let body=document.querySelector("body");

body.addEventListener("click",function(ev){
    console.log(ev.target.innerText);
})