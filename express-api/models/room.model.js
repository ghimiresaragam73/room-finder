const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var roomSchema = new Schema({
    discription: String,
    price: Number,
    image: [String],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
})

var roomModel = mongoose.model('room', roomSchema);

module.exports = roomModel;