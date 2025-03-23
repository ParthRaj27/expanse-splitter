// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const { Schema } = mongoose;

const authSchema = new Schema({
  fname:{
    type:String,
    require:true
  },
  lname:{
    type:String,
    require:true
  },
  password:{
    type:String,
    require:true
  },
  email:{
    type:String,
    require:true,
    unique:true
  },
  date:{
    type:Date,
    default:Date.now
  }
  
});
const User = mongoose.model('user', authSchema);
module.exports = User