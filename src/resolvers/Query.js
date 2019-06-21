function feed(parent, args, context, info)  {
    return context.prisma.links();
}

function user(parent, args, context, info) {
    return context.prisma.users();
}

module.exports = { 
    feed,
    user,
}