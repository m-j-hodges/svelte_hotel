const {User, Rooms } = require("../models");
const mongoose = require('mongoose');
const encryptPass = require('../utils/encrypt')
const bcrypt = require('bcrypt')
const {signToken} = require('../utils/Auth')

const resolvers = {
  Query: {
    User: async (parent, {username}) => {
      return User.findOne({username: username })
    },
    Rooms: async (parent, args) => {
      return await Rooms.find({});
    },
    Room: async (parent, args) => {
      return Rooms.findOne({_id: args._id});

    }
  },
  Mutation: {
    User: async (parent, {email, username, password}) => {
      return User.create({email: email, username: username, password:password})
    },
    Rooms: async (parent, {roomType, roomPrice, discounted, numAvailable}) => {
      return Rooms.create({roomType, roomPrice, discounted, numAvailable})
    },
    createRooms: async (parent, {input}) => {
      console.log(input)
      return await Rooms.insertMany(input)
      
    },
    deleteAllRooms: async (parent, {input}) => {
      return Rooms.deleteMany({});

    },
    updateRoom: async (parent, {_id, imgURL}) => {
      return await Rooms.findOneAndUpdate({_id: _id}, {
      imgURL: imgURL
      },
      {
        new: true,
        runValidators: true,
      }
      )

    },

    deleteRooms: async (parent, args) => {
      return Rooms.deleteOne({_id:args._id})

    }
    ,
    Register: async (parent, {username, password, email}) => {
      const encryptedPass = await bcrypt.hash(password,10)
      const user = await User.create({username: username, password: encryptedPass, email: email})
      const token = signToken(user)
      return {token, user}
    },
  }
};

module.exports = resolvers;