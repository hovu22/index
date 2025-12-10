const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ImageSchema = new Schema({
    id: { type: ObjectId },
    link: { type: String },
    productID: { type: ObjectId, ref: 'product' },
});

module.exports = mongoose.models.image || mongoose.model('image', ImageSchema);
