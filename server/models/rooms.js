const {Schema, model} = require('mongoose');

const roomsSchema = new Schema({
  roomType: {
    type: String,
    required: true,
  },
  roomPrice: {
    type: Number,
    required: true,
  },
  discounted: {
    type: Boolean,
  },
  numAvailable: {
    type: Number,
  },

});

const Rooms = model('Rooms', roomsSchema);

module.exports = Rooms;