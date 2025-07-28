//accessing dom element/node
//1.using id
let res=document.getElementById("mydiv");
// console.log(res)
console.dir(res);
//2.class
let h2=document.getElementsByClassName("h2");
console.log(h2) //list/collection
console.log(h2[0])
//3. tag name
let res2=document.getElementsByTagName("p");
console.log(res2);
//4. queryselector
let out=document.querySelector("p");
let out2=document.querySelectorAll("p")
console.log(out)

//document properties
//1. accessing element content and change it
//* innerHTML
console.log(res.innerHTML); //getter
// res.innerHTML=`<p>change using dom manipulation</p>` //setter
//* innerText
console.log(res.innerText)
res.innerText = `hello world` //setter
//* textContent

// accessing element class or id or etc.
//1. getAttribute
console.log(res.getAttribute("id"))
let btn = document.querySelector(".btn")

//2. only for class attribute
//* classList
let myH = document.querySelector(".myh");
console.log(myH.classList);
myH.classList.add("hi");
myH.classList.remove("myh");
let form = document.querySelector(".signup")
btn.addEventListener("click",()=>{
    // res.setAttribute("class","js")
    form.classList.toggle("hide")
})
