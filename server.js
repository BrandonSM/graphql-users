// import express into the app
const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require ('./schema/schema');

// create the express instance
const app = express();

// use the GraphiQL app in development mode
// can destructure schema: schema -> schema,
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

// Tell the express app to listen on port 4000
app.listen(4000, 
  () => {console.log('listening on port 4000')}
);