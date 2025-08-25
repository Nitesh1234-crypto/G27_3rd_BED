// function getCommentData(){
//     axios.get("https://jsonplaceholder.typicode.com/comments")
//     .then((res)=>{
//         console.log(res.data)
//     })
//     .catch((err)=>{
//         console.log(err.message)
//     })
// }
async function getCommentData(){
    try {
        let response=await axios.get("https://jsonplaceholder.typicode.com/comments")
        console.log(response.data)
    } catch (error) {
        console.log(error.message)
    }
   
}
getCommentData();

function adduser(email,password){
    console.log("bbbbbb")
    axios.post('http://localhost:3303/user', {
        email: email,
        password: password
    })
    .then((res)=>{
        console.log(res.data)
    })
    .catch((err)=>{
        console.log(err.message)
    })

}
adduser("Nitesh8174@gmail.com","1234")