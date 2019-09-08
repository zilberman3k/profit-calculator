import {dotenv, jwt, admin,connectToMongoose} from './common';
import {client, cache} from './common';
import {ApolloServer} from 'apollo-server-cloud-functions';

// add graphql modules
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';

// mongoose models
import {User, Story, Entry, Coin} from './models'

// config environment
dotenv.config();

// connect MongoDB
connectToMongoose();

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

export {server}