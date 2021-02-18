const { string } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var roomSchema = new Schema({
    price: Number,
    image: [String],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    categories:{
    type:String,
    enum:['premium','urgent','normal']
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
    address: String,

    description: String
}, {
    timestamps: true
})

var roomModel = mongoose.model('room', roomSchema);

module.exports = roomModel;