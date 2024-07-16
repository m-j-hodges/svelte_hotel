const {User, Rooms } = require("../models");
const mongoose = require('mongoose');
const encryptPass = require('../utils/encrypt')
const bcrypt = require('bcrypt')
const {signToken} = require('../utils/Auth')
const { AuthenticationError } = require('apollo-server-express');


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
    },
    getOrder: async (parent, args) => {
      const foundUser = await User.findOne({username: args.username}).populate('orders')
      return foundUser.orders

    },
    getAmenities : async (parent, args) => {
      const findRoom = await Rooms.findOne({roomType: args.roomType})
      return findRoom.amenities
    },
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
    loginUser: async (parent, {username, password}) => {
      const findUser = await User.findOne({username: username})
      if(!findUser) {throw new AuthenticationError('user not found!')
    }
      const verifyUser = await bcrypt.compare(password, findUser.password)
      if(!verifyUser) { throw new AuthenticationError('Incorrect Credentials!')} 
      const token = signToken(findUser)
      return {token, user: findUser}
    },
    saveOrder: async (parent, args) => {
        return await User.findOneAndUpdate({username: args.username},{
          $addToSet: {
            orders: {
              roomType: args.input.roomType, roomPrice: args.input.roomPrice, lengthOfStay: args.input.lengthOfStay, total: args.input.total, startDate: args.input.startDate, endDate: args.input.endDate 
            }
          }
        }, {new:true},
        )
        

    },
    removeOrder: async (parent, args) => {
      const updatedUser =  await User.findOneAndUpdate({username: args.username}, {
        $pull:{ orders: {_id: args.orderId}}

      }, {new: true})
      return updatedUser.orders
      
    },
    addAmenities: async (parent, args) => {
      const {input} = args
      return await Rooms.findOneAndUpdate({roomType:args.roomType}, {
        $addToSet: { amenities: {...input}
        }}, {new: true}
      )
    },
    
  },
};

module.exports = resolvers;