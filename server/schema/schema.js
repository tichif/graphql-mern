const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require('graphql');

const Project = require('../models/Project');
const Client = require('../models/Client');

// projects type
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },
  }),
});

// clients type
const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find();
      },
    },
    // get a specific project
    project: {
      type: ProjectType,
      // to get data of a single project
      args: { id: { type: GraphQLID } },
      // to return data
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },
    // get all clients
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find({});
      },
    },
    // get a specific client
    client: {
      type: ClientType,
      // to get data of a single client
      args: { id: { type: GraphQLID } },
      // to return data
      resolve(parent, args) {
        return Client.findById(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
