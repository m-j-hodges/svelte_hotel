const express = require('express');
const {ApolloServer} = require('apollo-server-express');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();
const path = require('path');
const routes = require('./routes')
const { typeDefs, resolvers } = require("./schemas")
const db = require('./config/connection');
const server = new ApolloServer({
  typeDefs,
  resolvers,
});



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
app.use(routes);

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}!`);
    console.log(`use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
  })
})
};

startApolloServer(typeDefs, resolvers);