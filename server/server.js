const express = require('express');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();
const path = require('path');
const routes = require('./routes')

const db = require('./config/connection');
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.static(path.join(__dirname, './public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes)

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}!`);
  })
});