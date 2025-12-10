const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const userScheme = new Schema({
   UserID:{
    type:ObjectId
   },
   Name:{
    type:String
   },
   Email:{
    type:String
   },
   Password:{
    type:String
   },
   Role:{
    type:String
   },
   Status:{
    type:String
   },
});
module.exports = mongoose.models.user || mongoose.model('user', userScheme);
// category -----> categories