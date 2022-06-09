const express = require('express');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const colors = require('colors');

const schema = require('./schema/schema');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
);

const port = process.env.PORT ?? 5000;

app.listen(port, () => console.log(`App is listening on port ${port}`));
