async function feed(parent, args, context, info)  {
    const where = args.filter ? {
        OR: [
            { description_contains: args.filter },
            { url_contains: args.filter },
        ],
    } : {}
    const links = await context.prisma.links({ 
        where
    });
    return links;
}

function user(parent, args, context, info) {
    return context.prisma.users();
}

module.exports = { 
    feed,
    user,
}