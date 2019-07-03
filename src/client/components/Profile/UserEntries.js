import React, {Fragment, useState} from 'react'
import {Query, Mutation, ApolloConsumer} from 'react-apollo'
import {Link} from 'react-router-dom'
import {
    GET_USER_STORIES,
    GET_FEED,
    DELETE_STORY,
    GET_CURRENT_USER,
    GET_USER_ENTRIES,
    GET_PROFIT_OF_ENTRY
} from '../../queries'
import moment from 'moment';

import {Table, Thead, Tbody, Tr, Th, Td} from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import './userEntries.scss';


function UserEntries({entries, total}) {

    // todo - check for popup verify delete...

    return <Table className="main-table">
        <Thead>
        <Tr>
            <Th>Date</Th>
            <Th>Coin</Th>
            <Th>Amount</Th>
            <Th>Profit</Th>
            <Th></Th>

        </Tr>
        </Thead>

        <Tbody>
        {entries.map(entry => {
            // toNiv - wrap with mutation here...
            const {id, date, coin, amount, slug,profit} = entry;
            console.log('**** - ', slug);
            const _date = moment(+date).format('YYYY-MM-DD HH:mm:ss');
            return <Tr key={id}>
                <Td>{_date}</Td>
                <Td>{coin}</Td>
                <Td>{amount}</Td>
                <Td>{profit}</Td>
                <Td><Link to={`/edit-entry/${id}`}>Edit</Link> { }<span>Delete</span></Td>
            </Tr>
        })}

        </Tbody>
        <tfoot>
        <tr><Th>Total</Th>
            <th>{total}</th>
        </tr>
        </tfoot>
    </Table>
}

export default UserEntries;