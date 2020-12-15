const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var roomSchema = new Schema({
    price: Number,
    image: [String],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    numberOfRoom: Number,
    carParking: {
        type: Boolean,
        default: false
    },
    bikeParking: {
        type: Boolean,
        default: false
    },
    address: String
}, {
    timestamps: true
})

var roomModel = mongoose.model('room', roomSchema);

module.exports = roomModel;