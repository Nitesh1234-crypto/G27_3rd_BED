// class Principal{
//     principalInstance = null;
//     _constructor(name){
//         this.name=name;
//     }
//    static getPrincipal(){
//      if(!principalInstance){
//         let principal = new Principal("Nitesh");
//         principalInstance=principal
//      }
//         return principalInstance;
//     }

//     resticateStudent(name){

//     }
//     suspend(name){

//     }
//     removeSuspension(name){

//     }
//     notify(message){

//     }
// }
// module.exports=Principal;
class Principal{
    principalInstance = new Map();
    /**
     {
      "school":Object<Principal>
    }
     */
    _constructor(school){
        this.school=school;
    }
   static getPrincipal(school){
     if(!principalInstance.get(school)){
        let principal = new Principal(school);
        principalInstance.set(school,principal);
     }
        return principalInstance.get(school);
    }

    resticateStudent(name){

    }
    suspend(name){

    }
    removeSuspension(name){

    }
    notify(message){

    }
}
module.exports=Principal;