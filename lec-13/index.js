let box=document.querySelector("#box");
let btn = document.querySelector("#btn")
let stop=document.querySelector("#stop")
let colours=["red","black","green","yellow","brown","pink","blue","purple","orange","grey"]
let id=null;
function generateRandomColour(){
    let index=Math.floor(Math.random()*10);
    console.log(index);
    let randomcolor= colours[index];
    console.log(randomcolor)
    box.style.background=randomcolor
}
btn.addEventListener("click",function(){
    id=setInterval(()=>{
    generateRandomColour();
    },500)
})
stop.addEventListener("click",function(){
    if(id){
         clearInterval(id)
    } 
})
