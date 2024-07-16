const {Schema, model} = require('mongoose');

const userSchema = new Schema({

  username: {type: String, 
  required: true,
  unique: true,
  trim: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  fullName: {
    type: String
  },
  orders: [
    {
    roomType: {
      type: String
    },
    roomPrice: {
      type: Number
    },
    startDate: {
      type: String,
      required: true
    },
    endDate: {
      type: String,
      required: true
    },
    lengthOfStay: {
      type: Number
    },
    nightlyRate: {
      type: Number
    },
    total: {
      type: Number
    }
  }
  ],

})

const User = model('User', userSchema);

module.exports = User;