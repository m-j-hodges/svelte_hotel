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
  amenities: [
    {
      hotTub:{
        type: Boolean
      },
      KingSizeBed: {
        type: Boolean
      },
      QueenSizeBed: {
        type: Boolean
      },
      TV: {
        type: Boolean
      },
      Refrigerator: {
        type: Boolean
      },
      wifi: {
        type: Boolean
      },
    }
  ],
});

const Rooms = model('Rooms', roomsSchema);

module.exports = Rooms;