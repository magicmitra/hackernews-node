const { GraphQLServer } = require('graphql-yoga');
// npm add prisma-client-lib
const { prisma } = require('./generated/prisma-client');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Link = require('./resolvers/Link');
const User = require('./resolvers/User');
const Subscription = require('./resolvers/Subscription');

/**
 * NOTE: After every change in the datamodel file, the
 * 1. Prisma API needs to be redeployed -> 'prisma deploy' on root dir.
 * 2. Update auto-generated Prisma client to expose CRUD methods for 
 * the newly added model - 'prisma generate' on root dir.
 */


const resolvers = {
    // resolvers always have to be named after the corresponding
    // schema definition.
    Query,
    Mutation,
    Link,
    User,
};

// Schema and resolvers are bundled and passed into
// The GraphQLServer. This tells the server what API
// operations are accepted and how they should be resolved. 
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    // attach context when the GraphQL server is initialized
    context: request => {
        return {
            ...request,
            prisma,
        }
    },
});

server.start(() => console.log(`Server is running on http://localhost:4000`));