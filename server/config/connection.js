const {connect, connection } = require('mongoose');


connect( process.env.MongoDB || 'mongodb://127.0.0.1:27017/hotel_db', 
{  useNewUrlParser: true,
    useUnifiedTopology: true,
})

module.exports = connection;