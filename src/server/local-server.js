const PORT = process.env.PORT || 5000;

import express from 'express';
import cors from 'cors';
import expressPlayground from 'graphql-playground-middleware-express';
import {dotenv, jwt, connectToMongoose} from './common';
import {client, cache} from './common';
import {ApolloServer} from 'apollo-server-express';
const admin = require('sriracha');
// add graphql modules
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';

// mongoose models
import {User, Story, Entry, Coin} from './models'

// config environment
dotenv.config();

// connect MongoDB
connectToMongoose();

// express server
const app = express();
app.use(cors());
app.use('/admin', admin());
app.get('/playground', expressPlayground({endpoint: '/graphql'}));

// apollo server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
    cacheControl: {defaultMaxAge: 30},
    context: async ({req}) => {
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        const coins = await resolvers.Query.getCoins();
        if (token) {
            const currentUser = await jwt.verify(token, process.env.SECRET);
            return {
                currentUser,
                User,
                Story,
                Entry,
                Coin,
                client,
                cache,
                coins
            }
        } else {
            return {
                User,
                Story,
                Entry,
                Coin,
                client,
                cache,
                coins
            }
        }
    }
});
server.applyMiddleware({app});
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
