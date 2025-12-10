const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId
const categorySchema = new Schema({
    id: { type: Schema.Types.ObjectId }, //khóa chính
    name: {
        type: String,
        required: true,
        unique: true,
        default: 'No name'
    },
    ParentID: { 
        type: ObjectId, 
        ref: 'Category'              
    }
});

module.exports = mongoose.models.Category || mongoose.model('Category', categorySchema);
//category.js --> Categorys