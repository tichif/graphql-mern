const { projects, clients } = require('../sampleData');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require('graphql');

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
        return clients.find((client) => client.id === parent.id);
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
        return projects;
      },
    },
    // get a specific project
    project: {
      type: ProjectType,
      // to get data of a single project
      args: { id: { type: GraphQLID } },
      // to return data
      resolve(parent, args) {
        return projects.find((project) => project.id === args.id);
      },
    },
    // get all clients
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return clients;
      },
    },
    // get a specific client
    client: {
      type: ClientType,
      // to get data of a single client
      args: { id: { type: GraphQLID } },
      // to return data
      resolve(parent, args) {
        return clients.find((client) => client.id === args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
