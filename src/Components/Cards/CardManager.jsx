import React, { useState, useEffect } from 'react';
import { useWeb3React } from "@web3-react/core";
import { CardGrid } from "./CardGrid";
import Card from './Card';
import axios from 'axios';
import { useSearchParams } from "react-router-dom";

export default function (props) {
    axios.defaults.headers.common['CF-Access-Client-Id'] = 'ee3609e2c3b9626bb9128eb707f93afa.access'
    axios.defaults.headers.common['CF-Access-Client-Secret'] = '453c91ec9153b8989820d1bbc72b71f81f5c1f9f1f879499a8ab24e118ac0864'
    const [searchParams, setSearchParams] = useSearchParams()
    const [loaded, setLoaded] = useState(false);
    const { account } = useWeb3React();
    const [filteredCards, setFilteredCards] = useState([]);
    const [cards, setCards] = useState([]);
    useEffect(() => {
        setLoaded(false);
        axios.get(`https://api-staging.thewatch.com/api/users/0x03818E2b69Cb63eCD8763B9B0f275d7f8995aF1a/items`)
            .then((response) => {
                setCards(response.data.data.items);
                applyFilter(response.data.data.items);
            })
    }, []);

    function applyFilter(cards) {
        setLoaded(false);
        let filteredCards 
        if(searchParams.get("filter")=="all" || searchParams.get("filter")==null ){
            console.log("not filtering",cards)
            setFilteredCards(cards.map(item => { return (<Card key={item.id} {...item}/>) }));
            setLoaded(true);
            return
        }
        console.log("filtering")
        filteredCards= cards.filter(card => {
            const atr = card.metadata.attributes;
            if (atr == undefined) return false
            const block = atr.find((element) => { return element.trait_type === "Block"; })
            if (block == undefined) return false
            return block.value == searchParams.get("filter")
        })
        setFilteredCards(filteredCards.map(item => { return (<Card key={item.id} {...item} />) }));
        setLoaded(true);
    }

    useEffect(() => {
        applyFilter(cards);
    }, [searchParams])

    return (
        <>
            {loaded && filteredCards.length > 0 && <CardGrid cards={filteredCards} />}
            {!loaded && <h1> NACITAVAM</h1>}
        </>
    );
};