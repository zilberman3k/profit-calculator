import React, {Fragment} from 'react'
import {Query, Mutation} from 'react-apollo'
import {Link} from 'react-router-dom'
import {GET_USER_STORIES, GET_FEED, DELETE_STORY, GET_CURRENT_USER, GET_USER_ENTRIES} from '../../queries'
import moment from 'moment';

import {Table, Thead, Tbody, Tr, Th, Td} from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import './userEntries.scss';

function UserEntries({entries}) {
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
            const {id, date,coin,amount} = entry;
            const _date = moment(+date).format('YYYY-MM-DD HH:mm:ss');
            return <Tr key={id}>
                <Td>{_date}</Td>
                <Td>{coin}</Td>
                <Td>{amount}</Td>
                <Td>res</Td>
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