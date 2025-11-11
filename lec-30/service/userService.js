const {PrismaClient} = require("./generated/prisma");
let prisma= new PrismaClient();
class User{

   static async addUser(email,name){
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
 static async  getUser(email){
    let user= await prisma.user.findUnique({
        where:{
            email:email
        }
    })
    return user
}
 static async  deleteUser(id){
    await prisma.user.delete({
        where:{
            id:Number(id)
        }
    })
    return "user deleted"
}
static async getProfile(userId){
    let isUserDetailExit= await client.get("user:"+userId.toString());
    if(isUserDetailExit){
        return isUserDetailExit;
    }
    let userDetail = await prisma.user.findUnique({
        where:{
            id: userId
        }

    })
    await client.set("user:"+userId,JSON.stringify(userDetail))
    return userDetail;
}

}
module.exports = User;