const { GraphQLServer } = require('graphql-yoga');

// 1 This will define the GraphQL schema
const typeDefs = `
    type Query {
        info: String!
    }
`;

// 2 The actual implementation of the GraphQL schema. 
// Notice how its structure is identical to the Query
const resolvers = {
    Query: {
        info: () => `This is the API of a hackernews clone`,
    }
};

// 3 Schema and resolvers are bundled and passed into
// The GraphQLServer. This tells the server what API
// operations are accepted and how they should be resolved. 
const server = new GraphQLServer({
    typeDefs,
    resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:4000`));