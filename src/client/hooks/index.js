import React, {useState, useEffect} from 'react';

const useCoinModel = ({id = '', name = '', slug = '', symbol = ''}) => {
    const [text, setText] = useState(name);
    const [coin, setCoin] = useState({id, name, slug, symbol});

    useEffect(() => {
        setText(coin.name);
    }, [coin]);


    return [text, setText, coin, setCoin];
};
export {useCoinModel};

