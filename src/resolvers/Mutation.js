const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

async function signup(parent, args, context, info) {
    
    // encrypt user pass using bcryptjs lib
    const password = await bcrypt.hash(args.password, 10);

    // user Prisma client instance to store new user in DB
    const user = await context.prisma.createUser({ ...args, password });

    // generate a jwt and APP_SECRET
    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    // return object adhering to shape of AuthPayload
    return {
        token,
        user,
    }
}

async function login(parent, args, context, info) {

    // retrieve existing user
    const user = await context.prisma.user({ email: args.email });
    if(!user) {
        throw new Error('No user found');
    }

    // compare passwords
    const valid = await bcrypt.compare(args.password, user.password);
    if(!valid) {
        throw new Error('Invalid password');
    }

    const token = jwt.sign({ userId: user.id}, APP_SECRET);

    // return object adhering to shape of AuthPayload
    return {
        token,
        user,
    }
}

async function vote(parent, args, context, info) {
    // Validate the incoming JWT 
    const userId = getUserId(context);

    /**
     * The prisma client generates one $exists function per model.
     * $exists takes a 'where' filter object that allows to specify
     * certain conditions about elements of that type. Only if the 
     * condition applies to at least one element in the database, the 
     * $exists function returns true.
     */
    const linkExists = await context.prisma.$exists.vote({
        user: { id: userId },
        link: { id: args.linkId },
    })
    if(linkExists) {
        throw new Error(`Already voted for link: ${args.linkId}`);
    }

    // If $exists returns false, the 'createVote' method will be 
    // used to create a new Vote thats connected to the User
    // and Link.
    return context.prisma.createVote({
        user: { connect: { id: userId } },
        link: { connect: { id: args.linkId } },
    });
}

function post(parent, args, context, info) {
    const userId = getUserId(context);
    return context.prisma.createLink({
        url: args.url,
        description: args.description,
        postedBy: { connect: { id: userId } },
    });
}



module.exports = {
    login,
    signup,
    vote,
    post,
}