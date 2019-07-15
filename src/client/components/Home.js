import React, {useState} from 'react';
import StoryCard from './Story/StoryCard';
import {ApolloConsumer, Query, Mutation} from 'react-apollo';
import {GET_FEED, GET_TOTAL_PROFIT_OF_USER, GET_CURRENT_USER, SET_PROFIT_OF_USER} from '../queries';
import UserEntries from './Profile/UserEntries';
import HPLoader from './loaders/HPLoader';
import Welcome from './Welcome';


const Home = ({session}) => {
    return <div>
        <Query query={GET_CURRENT_USER}>
            {({loading, error, data, fetchMore, updateQuery, client}) => {

                if (loading) {
                    return <HPLoader/>;
                }

                if (!data || !data.getCurrentUser) {
                    return <Welcome status='LOGGED_OUT'/>
                }

                const {entries, total} = data.getCurrentUser;

                if (entries.length === 0) {
                    return <Welcome status='NO_ENTRIES'/>
                }

                client.mutate({
                    mutation: SET_PROFIT_OF_USER,
                    variables: {profits: entries.map(({profit}) => profit)},
                    update: (cache, {data}) => {
                        updateQuery(user => {
                            if (user) {
                                user.getCurrentUser.total = data.setProfitOfUser;
                                return user;
                            }
                            return data
                        });
                    }
                });
                return (
                    <div className="Home">
                        <UserEntries entries={entries} total={total}/>
                    </div>
                )
            }}
        </Query>

    </div>;
};

export default Home;