const {Schema, model} = require('mongoose');

const roomsSchema = new Schema({
  roomType: {
    type: String
  },
  roomPrice: {
    type: Number
  },
  discounted: {
    type: Boolean
  },
  numAvailable: {
    type: Number
  },
  imgURL: {
    type: String
  },
});

const Rooms = model('Rooms', roomsSchema);

module.exports = Rooms;