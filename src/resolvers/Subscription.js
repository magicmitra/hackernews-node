/**
 * Rather than returning data directly, they return an AsyncIterator which is 
 * subsequently used by the GraphQL server to push the data to the client.
 */
function newLinkSubscribe(parent, args, context, info) {
    return context.prisma.$subscribe.link({ mutation_in: ['CREATED'] }).node();
}

/**
 * Subscription resolvers are wrapped inside an object and need to be provided 
 * as the value for a subscribe field. Another field named 'resolve' needs to 
 * be provided that actually returns the data from the data emitted by the
 * AsyncIterator.
 */
const newLink = {
    subscribe: newLinkSubscribe,
    resolve: payload => {
        return payload
    },
}

function newVoteSubscribe(parent, args, context, info) {
    return context.prisma.$subscribe.vote({ mutation_in: ['CREATED'] }).node();
}

const newVote = {
    subscribe: newVoteSubscribe,
    resolve: payload => {
        return payload
    },
}

module.exports = {
    newLink,
    newVote,
}