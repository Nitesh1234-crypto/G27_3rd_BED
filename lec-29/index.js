
 async function addUser(email,name){
    // User user= new User("","");
    //user.save()
    const newUser= await prisma.user.create({
        data:{
            email:email,
            name:name
        }

    }) 
    return "User added"  
 }

// addUser("Nitesh1234@gmail","Nitesh")
// .then((data)=>console.log(data))
// .catch((e)=>console.log(e))


async function getUser(email){
    let user= await prisma.user.findUnique({
        where:{
            email:email
        }
    })
    return user
}
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






