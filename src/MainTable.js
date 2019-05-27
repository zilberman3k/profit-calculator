import React from 'react';
import {Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import './MainTable.scss';

function MainTable() {
    return <Table className="main-table">
        <Thead>
        <Tr>
            <Th>Event</Th>
            <Th>Date</Th>
            <Th>Location</Th>
            <Th>Location</Th>

        </Tr>
        </Thead>
        <Tbody>
        <Tr>
            <Td>Tablescon</Td>
            <Td>9 April 2019</Td>
            <Td>East Annex</Td>
            <Td>East Annex</Td>
        </Tr>
        <Tr>
            <Td>Capstone Data</Td>
            <Td>19 May 2019</Td>
            <Td>205 Gorgas</Td>
        </Tr>
        <Tr>
            <Td>Tuscaloosa D3</Td>
            <Td>29 June 2019</Td>
            <Td>Github</Td>
        </Tr>
        </Tbody>
        <tfoot>
        <tr><Th>Total</Th><th>50$</th></tr>
        </tfoot>
    </Table>
}

export default MainTable;