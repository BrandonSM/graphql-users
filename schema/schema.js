const graphql = require('graphql');

// Using hard-coded data for testing
const users = [
  {id: '23', firstName: 'Brandon', age: 32 },
  {id: '47', firstName: 'Ashley', age: 30 },
  {id: '55', firstName: 'Winston', age: 49 }
];

// destructure the graphQL object to what we need. We need the following object types
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} = graphql;


// Describe the 'User' table. 
// Each user will have an ID (string), firstName (string), and age (integer)
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt }
  }
})

// If you'r elooking for a user, if you give me an ID, I'll give you a user
// in the resolve resolve function, this is where your logic goes
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString }},
      // this is where you actually go into the database and do something
      // in this case when you go into the database and look for a user (it's in the User id field)
      resolve(parentValue, args) {
        return _.find(users, {id: args.id });
      }
    }
  }
});

// Setup the Schema, the Schema only has one property which is RootQuery
new GraphQLSchema({
  query: RootQuery
})
