const { GraphQLServer } = require('graphql-yoga');

// dummy data, stored in memory for now, be stored to DB later
let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
}]

// This will define the GraphQL schema
const typeDefs = `
    type Query {
        info: String!,
        feed: [Link!]!,
    }

    type Link {
        id: ID!
        description: String!
        url: String!
    }
`;


// The actual implementation of the GraphQL schema. 
// Notice how its structure is identical to the Query
const resolvers = {
    Query: {
        info: () => `This is the API of a hackernews clone`,
    }
};

// Schema and resolvers are bundled and passed into
// The GraphQLServer. This tells the server what API
// operations are accepted and how they should be resolved. 
const server = new GraphQLServer({
    typeDefs,
    resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:4000`));