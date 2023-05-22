import React, { useState, useEffect } from 'react';
import { useWeb3React } from "@web3-react/core";
import { CardGrid } from "./CardGrid";
import Card from './Card';
import axios from 'axios';

export default function (props) {
    axios.defaults.headers.common['CF-Access-Client-Id'] = 'ee3609e2c3b9626bb9128eb707f93afa.access'
    axios.defaults.headers.common['CF-Access-Client-Secret'] = '453c91ec9153b8989820d1bbc72b71f81f5c1f9f1f879499a8ab24e118ac0864'

    const [loaded, setLoaded] = useState(false);
    const { account } = useWeb3React();
    const [watchIdCards, setWatchIdCards] = useState([]);

    useEffect(() => {
        setLoaded(false);
        axios.get(`https://api-staging.thewatch.com/api/users/0x03818E2b69Cb63eCD8763B9B0f275d7f8995aF1a/items`)
            .then((response) => {
                const data = response.data.data;
                console.log(data);
                const cards = data.items.map(item => { return (<Card key={item.id} {...item} />)});
                setWatchIdCards(cards);
                setLoaded(true);  
            })
    }, []);
    
    return (
        <>
            {loaded && watchIdCards.length> 0 && <CardGrid cards={watchIdCards} />}
            {!loaded && <h1> NACITAVAM</h1>}
        </>
    );
};