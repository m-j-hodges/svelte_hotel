const bcrypt = require('bcrypt')

const encryptPass = async (password) => {
  return await bcrypt.hash(password, 10)

}

module.exports =  encryptPass