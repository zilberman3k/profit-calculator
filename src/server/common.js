// apollo packages
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloClient} from 'apollo-client';
import {SchemaLink} from 'apollo-link-schema';
import typeDefs from './graphql/schema';
const cache = new InMemoryCache();
const client = new ApolloClient({
    ssrMode: true,
    link: new SchemaLink({schema: typeDefs}),
    cache,
    typeDefs
});

const connectToMongoose = ()=>{
    // connect MongoDB
    mongoose.Promise = global.Promise;
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useNewUrlParser', true);

    mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true})
        .then(() => console.log('MongoDB connected'))
        .catch((err) => console.log(err));

};

// general and mongoose
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');


export {InMemoryCache,ApolloClient,SchemaLink,client,cache}
export {mongoose,dotenv,jwt, connectToMongoose};

