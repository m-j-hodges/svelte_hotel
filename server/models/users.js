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
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    }
  },

  ],

})

const User = model('User', userSchema);

module.exports = User;