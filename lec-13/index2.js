let edit = document.querySelector(".edit")
let del=document.querySelector(".delete")
/*
parent
child
siblings
*/
//1.nextElementSibling
//2/previousElementSibling
console.log(edit.nextElementSibling)
console.log(edit.previousElementSibling)
console.log(edit.nextElementSibling.nextElementSibling.innerText)
//h1
console.log(edit.parentElement.previousElementSibling)
let id=del.parentElement.parentElement.parentElement.getAttribute("id")
console.log(id);