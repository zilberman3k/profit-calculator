import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Query} from 'react-apollo'
import {GET_COINS} from '../queries'
import Autocomplete from 'react-autocomplete';
import {useCoinModel} from '../hooks'
import '../styles/coin-picker.scss'
function CoinSelector({defaultCoin = {}, onChange = ()=>{}}) {
    const placeholder = 'Select Coin';
    const [text, setText, coin, setCoin] = useCoinModel(defaultCoin);

    return <Query query={GET_COINS}>
            {({data, loading}) => {
                if (loading) return <div>Loading...</div>

                const coins = data.getCoins || [];
                return <Autocomplete
                    items={coins}
                    shouldItemRender={(item, value) => (item.name + ' ' + item.symbol).search(new RegExp(value, "i")) > -1}
                    getItemValue={(item) => item.name}
                    renderItem={(item, highlighted) => {//console.log(item);
                        return <div
                            key={item.slug}
                            style={{backgroundColor: highlighted ? '#ddd' : 'white'}}
                        >
                            {item.name} - ({item.symbol})
                        </div>
                    }
                    }
                    inputProps={{placeholder,className:'textBox'}}
                    renderMenu={(items, value, style) => <div className="container"  children={items}/>}
                    value={text}
                    onChange={(e) => {
                        // console.log(text, coin.name);
                        setText(e.target.value)
                    }}
                    onSelect={(value, selectedCoin) => {
                        setCoin(selectedCoin);
                        onChange && onChange(selectedCoin);
                    }}
                    onMenuVisibilityChange={(isOpen)=>{
                        !isOpen && coin.name!==text && setText(coin.name);
                    }}
                    wrapperProps={{className:'coinPicker'}}
                />;
            }}
        </Query>;
}

CoinSelector.propTypes = {
    onChange: PropTypes.func.isRequired
};

export default CoinSelector;