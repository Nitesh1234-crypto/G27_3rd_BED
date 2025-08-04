//fetch
fetch("http://localhost:5555/todos")
.then((response)=> response.json())
.then((data)=>console.log(data))