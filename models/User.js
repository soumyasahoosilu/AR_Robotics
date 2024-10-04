const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  
  email: {
    type: String,
    required: true,
    unique: true
  },
  age:{
    type:String,
    required:true

  },
  password: {
    type: String,
    required: true
  },
  address:{
    type:String,
    required:true
  },

  isAdmin: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('User', UserSchema);

