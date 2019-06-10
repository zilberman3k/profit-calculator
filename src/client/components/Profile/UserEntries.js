import React, {Fragment} from 'react'
import {Query, Mutation} from 'react-apollo'
import {Link} from 'react-router-dom'
import {GET_USER_STORIES, GET_FEED, DELETE_STORY, GET_CURRENT_USER, GET_USER_ENTRIES,GET_PROFIT_OF_ENTRY} from '../../queries'
import moment from 'moment';

import {Table, Thead, Tbody, Tr, Th, Td} from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import './userEntries.scss';

const Profit = ({id,date, coin, amount,slug}) => {
            debugger;
    return <Query query={GET_PROFIT_OF_ENTRY} variables={{date,coin, slug, amount}}>
        {({data, loading, error}) => {
            if (loading) return <div>Loading...</div>
            if(error){
                return <div>Error...</div>;
            }
            debugger;
            console.log(data);
            console.log(error);
            return <div>{data.getProfitOfEntry}</div>
        }}
    </Query>
}


function UserEntries({entries}) {
    debugger;
    return <Table className="main-table">
        <Thead>
        <Tr>
            <Th>Date</Th>
            <Th>Coin</Th>
            <Th>Amount</Th>
            <Th>Profit</Th>

        </Tr>
        </Thead>

        <Tbody>
        {entries.map(entry => {
            const {id, date, coin, amount,slug} = entry;
            console.log('**** - ',slug);
            const _date = moment(+date).format('YYYY-MM-DD HH:mm:ss');
            return <Tr key={id}>
                <Td>{_date}</Td>
                <Td>{coin}</Td>
                <Td>{amount}</Td>
                <Td><Profit {...entry}/></Td>
            </Tr>
        })}

        </Tbody>
        <tfoot>
        <tr><Th>Total</Th>
            <th>50$</th>
        </tr>
        </tfoot>
    </Table>
}

export default UserEntries;