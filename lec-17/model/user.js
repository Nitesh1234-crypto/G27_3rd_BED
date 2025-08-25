const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: String,
  email: String,
  password: Date,
  blogs:[
    {
        type:mongoose.Types.ObjectId,
        ref:Blogs
    }
  ]
});
module.exports=mongoose.model('User', userSchema)