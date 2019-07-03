import React, {Component, useState} from 'react'
import {Mutation,Query} from 'react-apollo'
import {withRouter} from 'react-router-dom'
import DateTime from 'react-datetime';
import moment from 'moment';
import '../../styles/date-picker.scss';
import withAuth from '../withAuth'
import {ADD_STORY, GET_FEED, GET_USER_STORIES, EDIT_ENTRY, GET_CURRENT_USER} from '../../queries'
import Error from '../Error'
import CoinSelector from '../CoinSelector';
import gql from 'graphql-tag';

//// test /////
import AutoComplete from '../AutoComplete';
//////////////////////

const test = (...args)=>{
    console.log(args);
}


function EditEntry({session, history, match}) {

    const {id} = match.params;
    const entry = session.getCurrentUser.entries.find(e=>e.id===id);

    const [date, setDate] = useState(moment(+entry.date).format('YYYY-MM-DD HH:mm:ss'));
    const [coin, setCoin] = useState(entry.coin);
    const [slug, setSlug] = useState(entry.slug);
    const [amount, setAmount] = useState(entry.amount);

    const inputs = {id, date, coin,slug, amount};

    const handleSubmit = async (e, editEntry) => {
        e.preventDefault();
        debugger;
        try {
            const entry = await editEntry();
        }
        catch(e){
        debugger;
        }
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

            case 'date':
                fn = setDate;
                validateDate = true;
                break;
            case 'amount':
                fn = setAmount;

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

    const updateCoin = (name,slug)=>{
        setCoin(name);
        setSlug(slug);
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
            mutation={EDIT_ENTRY}
            variables={{...inputs, amount:parseFloat(amount)}}
            refetchQueries={() => [
                {query: GET_CURRENT_USER}
            ]}
        >
            {(editEntry, {data, loading, error,client}) => {

                console.log(data,inputs);
                debugger;

                return <form
                    className="form"
                    onSubmit={(e) => handleSubmit(e, editEntry)}
                >
                    <h2>Edit Entry</h2>
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

                  {/*  <CoinSelector onChange={updateCoin} defaultCoin={coin}/>*/}

                    <AutoComplete defaultCoin={coin} onClick={updateCoin} />

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

export default withAuth(session => session && session.getCurrentUser)(withRouter(EditEntry))
