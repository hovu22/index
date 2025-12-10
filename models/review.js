const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const reviewScheme = new Schema({
    ReviewID:{
        type:ObjectId,
    },
   UserID:{
        type:ObjectId,ref:'user'
    },
    productID:{
        type:ObjectId,ref:'product'
    },
    Rating:{
        type:Number
    },
    Description:{
        type:String
    },
    CreateAt:{
        type:Date
    }
});
module.exports = mongoose.models.review || mongoose.model('review', reviewScheme);
// category -----> categories