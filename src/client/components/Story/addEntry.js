import React, {Component, useState} from 'react'
import {Mutation} from 'react-apollo'
import {withRouter} from 'react-router-dom'
import DateTime from 'react-datetime';
import moment from 'moment';
import '../../styles/date-picker.scss';
import withAuth from '../withAuth'
import {ADD_STORY, GET_FEED, GET_USER_STORIES, ADD_ENTRY, GET_CURRENT_USER} from '../../queries'
import Error from '../Error'
import CoinSelector from '../CoinSelector';

import LikeStory from './LikeStory'

function AddEntry({session, history}) {
    const [id, setId] = useState('');
    const [date, setDate] = useState('');
    const [coin, setCoin] = useState('');
    const [amount, setAmount] = useState('');

    const inputs = {id, date, coin, amount};

    const handleSubmit = async (e, addEntry) => {
        e.preventDefault();

        const entry = await addEntry();
        history.push('/');
    };

    const temp = (e) => {
        e.preventDefault();
        setDate(moment().format('YYYY-MM-DD HH:mm:ss'));
        return false;
    };
    const updateInput = (name, val) => {
        let fn = null, validateDate = false;
        switch (name) {
            case 'id':
                fn = setId;
                break;
            case 'date':
                fn = setDate;
                validateDate = true;
                break;
            case 'coin':
                fn = setCoin;
                break;
            case 'amount':
                fn = setAmount;
                if (amount !== Number(val)) {
                    val = Number(val);
                }
                break;
        }
        if (validateDate) {
            if (val.isValid() && val.isBefore(moment.now())) {
                val = val.format('YYYY-MM-DD HH:mm:ss');
            } else {
                return false;
            }
        }

        return fn && fn(val);
    };

    const validateDate = (current) => {
        return current.isBefore(moment.now())
    };

    const datePickerProps = {
        className: 'form-control',
        placeholder: 'Date'
    };

    return <div className="App">
        <Mutation
            mutation={ADD_ENTRY}
            variables={{...inputs, id: Date.now() + ''}}
            refetchQueries={() => [
                {query: GET_CURRENT_USER}
            ]}
        >
            {(addEntry, {data, loading, error}) => {

                console.log(loading);
                console.log(data);
                return <form
                    className="form"
                    onSubmit={(e) => handleSubmit(e, addEntry)}
                >
                    <h2>Add Entry</h2>
                    <div style={{width:'100%',maxWidth:'600px',display:'inline-flex'}}>
                        <DateTime dateFormat="YYYY-MM-DD"
                                  timeFormat="HH:mm:ss"
                                  defaultValue={date || ''}
                                  value={date}
                                  inputProps={datePickerProps}
                                  isValidDate={validateDate}
                                  onChange={e => updateInput('date', e)}
                        />
                        <button className="now-btn" onClick={temp}>Now</button>
                    </div>

                    <CoinSelector onChange={({name}) => updateInput('coin', name)}/>

                    <input
                        type="text"
                        placeholder="Amount"
                        name="amount"
                        value={amount}
                        required
                        className="add-entry-amount"
                        onChange={e => updateInput('amount', e.target.value)}
                    />


                    <button
                        type="submit"
                        disabled={false} // todo - validate all
                    >
                        Submit
                    </button>
                    {error ? <Error message={error.message}/> : ''}
                </form>
            }}
        </Mutation>
    </div>

}

export default withAuth(session => session && session.getCurrentUser)(withRouter(AddEntry))