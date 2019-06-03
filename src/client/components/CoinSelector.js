import React, {useState} from 'react';
import {Query} from 'react-apollo'
import {GET_COINS} from '../queries'

// toDo - set onValue select

function CoinSelector({defaultValue,onChange}) {
    const [coin,setCoin] = useState(defaultValue || '');
    return <div>
        <Query query={GET_COINS}>
            {({data, loading}) => {
                const options = data.getCoins || [];

                if (loading) return <div>Loading...</div>

                return <select onChange={onChange}>
                    {options.map(({id, name, slug}) => <option key={id} value={slug}
                                                               defaultValue={'tether'}>{name}</option>)}
                </select>
            }}
        </Query>
    </div>
}

export default CoinSelector;