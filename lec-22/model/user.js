const mongoose = require('mongoose');
const blog = require('./blog');
const Schema = mongoose.Schema;
const User = new Schema({
  username: {
    type:String,
    require:true
  },
  email: String,
  password: String,
  blogs:[{
    type:mongoose.Types.ObjectId,
    ref:"Blog"
  }]
});
module.exports=mongoose.model('User', User);