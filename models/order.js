const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const orderScheme = new Schema({
    OderID:{
        type:ObjectId,
    },
   UserID:{
        type:ObjectId,ref:'user'
    },
    FullName:{
        type:String,
    },
    Address:{
        type:String,
    },
    Status:{
        type:String
    },
    PaymentMethod:{
        type:String,
    },
    CreateAt:{
        type:Date,
    }
    
});
module.exports = mongoose.models.order || mongoose.model('order', orderScheme);
// category -----> categories