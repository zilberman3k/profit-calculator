// add modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
// add graphql modules
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');
import expressPlayground from 'graphql-playground-middleware-express';
// mongoose models
const User = require('./models/User');
const Story = require('./models/Story');
const Entry = require('./models/Entry');
const Coin = require('./models/Coin');

import {InMemoryCache} from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { SchemaLink } from 'apollo-link-schema';

const cache = new InMemoryCache();
const client = new ApolloClient({
    ssrMode: true,
    // Instead of "createHttpLink" use SchemaLink here
    link: new SchemaLink({ schema: typeDefs }),
    cache
});


// config environment
dotenv.config();

// connect MongoDB
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
	.then(() => console.log('MongoDB connected'))
	.catch((err) => console.log(err));


const app = express();

const PORT = process.env.PORT || 5000;

// allow client connect to server
app.use(cors());

app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

const server = new ApolloServer({
	typeDefs,
	resolvers,
    cacheControl: { defaultMaxAge: 30 },
	context: async ({ req }) => {
		const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        const coins = await resolvers.Query.getCoins();
		if (token && token !== null) {
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

server.applyMiddleware({ app });

// run server
app.listen(PORT, 
	() => console.log(`Server is running on port ${PORT}`));
