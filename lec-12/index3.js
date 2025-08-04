//how to insert new element in dom
//1 . create a new Element ---> createElement
//2. add required data in that element using innerText or innerHtml
//3 . add that element in parent container usinge appendChild or append
let todo={
    id:3435435,
    title:"Todo4"
}
let ul=document.querySelector(".todoList")

function addTodo(todo){
    let li = document.createElement("li");
    li.setAttribute("id",`${todo.id}`)
    li.innerHTML=` <div>
                <input type="checkbox" name="" id="checkbox">
                <h1>${todo.title}</h1>
                <div>
                    <button class="edit">✏</button>
                    <button class="delete">❌</button>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, officiis!</p>
                </div>
            </div>`
        ul.appendChild(li);

}
addTodo(todo);