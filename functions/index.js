const {server} = require('./cloud-server/cloud-server');

exports.graphql = server.createHandler({
    cors: {
        origin: true,
        credentials: true,
    },
});


