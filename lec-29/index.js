const express= require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
const userRoutes= require("./routes/userRoutes")

app.use("/api/users",userRoutes)


app.listen(5555,()=>{
    console.log("server started")
}

)


// addUser("Nitesh1234@gmail","Nitesh")
// .then((data)=>console.log(data))
// .catch((e)=>console.log(e))


// async function getUser(email){
//     let user= await prisma.user.findUnique({
//         where:{
//             email:email
//         }
//     })
//     return user
// }
// getUser("Nitesh1234@gmail")
// .then((data)=>console.log(data))


async function addTweet(userId, body){
    try {
         let newTweet= await prisma.tweet.create({
        data:{
            userId:Number(userId),
            body:body
        }
    })
    return newTweet;
    } catch (error) {
        throw new Error(error.message)
    } 
}
// addTweet("2","my second tweet")
// .then((data)=>console.log(data))
// .catch((e)=>console.log(e))

async function updateTweet(id,userId, updatedBody){
    let tweet= await prisma.tweet.findFirst({
        where:{
            id:Number(id),
            userId:Number(userId)
        }
    })
    if(!tweet){
        return "something went wrong"
    }

    await prisma.tweet.update({
        where:{
            id:Number(id)
        },
        data:{
            body:updatedBody
        }
    })
    return "tweet updated"
}
// updateTweet("1","1","update my tweet")
// .then((data)=>console.log(data))
// .catch((e)=>console.log(e))


// deleteUser("1")
// .then((data)=>console.log(data))


// async function readTweets(){
//     //select , includes
//     //read all tweets 
//     let alltweets= await prisma.tweet.findMany({
//         select:{
//            user:{
//             select:{
//                 name:true
//             }
//            } ,
//            body:true,
//            date:true
//         }
//     })
//     return alltweets;
// }
async function readTweets(){
    //select , include
    //read all tweets 
    let alltweets= await prisma.tweet.findMany({
       include:{
        user:{
            select:{
                name:true
            }
        }
       }
    })
    return alltweets;
}
readTweets()
.then((data)=>console.log(data))
.catch((e)=>{console.log(e)})
