const { GraphQLServer } = require('graphql-yoga');
// npm add prisma-client-lib
const { prisma } = require('./generated/prisma-client');

// The actual implementation of the GraphQL schema. 
// Notice how its structure is identical to the Query
const resolvers = {
    // resolvers always have to be named after the corresponding
    // schema definition.
    Query: {
        info: () => `This is the API of a hackernews clone`,
        feed: (root, args, context, info) => {
            return context.prisma.links()
        },
    },

    Mutation: {
        // post resolver first creates a new link object, then adds 
        // it to the existing links and returns the new link.
        post: (root, args, context) => {
            return context.prisma.createLink({
                url: args.url,
                description: args.description,
            })
        },
    },

    // resolvers for the Link type from schema definition
    Link: {
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url,
    }
};

// Schema and resolvers are bundled and passed into
// The GraphQLServer. This tells the server what API
// operations are accepted and how they should be resolved. 
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    // attach context when the GraphQL server is initialized
    context: { prisma },
});

server.start(() => console.log(`Server is running on http://localhost:4000`));