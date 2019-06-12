const { GraphQLServer } = require('graphql-yoga');

// dummy data, stored in memory for now, be stored to DB later
let links = [
    {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
    },
    {
        id: 'link-1',
        url: 'www.redtube.com',
        description: 'Nude tutorial for whatever',
    },
];

// The actual implementation of the GraphQL schema. 
// Notice how its structure is identical to the Query
const resolvers = {
    Query: {
        // resolver always have to be named after the corresponding
        // schema definition.
        info: () => `This is the API of a hackernews clone`,
        feed: () => links,
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
});

server.start(() => console.log(`Server is running on http://localhost:4000`));