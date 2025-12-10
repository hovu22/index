const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const cartScheme = new Schema({
   UserID:{
        type:ObjectId,ref:'user'
    },
    productID:{
        type:ObjectId,ref:'product'
    },
    Quantity:{
        type:Number
    },
    UpdateAt:{
        type:Date
    }
});
module.exports = mongoose.models.cart || mongoose.model('cart', cartScheme);
// category -----> categories