import React, { useState, useEffect, useRef } from 'react';
import { useWeb3React } from "@web3-react/core";
import { CardGrid } from "./CardGrid";
import Card from './Card';
import axios from 'axios';
import loadingGIF from '../../Images/loading.gif';
import { useSearchParams } from "react-router-dom";

export default function (props) {
    axios.defaults.headers.common['CF-Access-Client-Id'] = 'ee3609e2c3b9626bb9128eb707f93afa.access'
    axios.defaults.headers.common['CF-Access-Client-Secret'] = '453c91ec9153b8989820d1bbc72b71f81f5c1f9f1f879499a8ab24e118ac0864'
    const [searchParams, setSearchParams] = useSearchParams()
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(true);
    const { account } = useWeb3React();
    const [filteredCards, setFilteredCards] = useState([]);
    const [cards, setCards] = useState([]);
    const counter = useRef(0);
    
    const imageLoaded=(count)=>{
        console.log(loading,counter.current,count )
        counter.current += 1;
        if (counter.current >= count) {
            setLoading(false);
        }
    }

    useEffect(() => {
        setLoaded(false);
        axios.get(`https://api-staging.thewatch.com/api/users/0x03818E2b69Cb63eCD8763B9B0f275d7f8995aF1a/items`)
            .then((response) => {
                const items = response.data.data.items
                for (let index = 0; index < items.length; index++) {
                    items[index].id = index
                }
                setCards(items);
                applyFilter(response.data.data.items);
                setLoaded(true);
            })
    }, []);

    async function applyFilter(cards) {
        let filteredCards;
        if (searchParams.get("filter") == "all" || searchParams.get("filter") == null) {
            filteredCards = cards.filter(card => {
                return true
            })
            setFilteredCards(filteredCards.map((item, index) => { return (<Card key={index} id={index} {...item} onLoadImage={()=>imageLoaded(filteredCards.length)} />) }));
            return;
        }
        if (searchParams.get("filter") == "Units") {
            filteredCards = cards.filter(card => {
                const atr = card.metadata.attributes;
                if (atr == undefined) return false
                const unit = atr.find((element) => { return element.trait_type === "Unit"; })
                if (unit != undefined) return true
            })
        } else {
            if (searchParams.get("filter") == "Utility") {
                filteredCards = cards.filter(card => {
                    return card.flags[0] != undefined
                })
            } else {
                filteredCards = cards.filter(card => {
                    const atr = card.metadata.attributes;
                    if (atr == undefined) return false
                    const block = atr.find((element) => { return element.trait_type === "Block"; })
                    if (block == undefined) return false
                    return block.value == searchParams.get("filter")
                })
            }
        }
        setFilteredCards(filteredCards.map((item, index) => { return (<Card key={index} {...item} onLoadImage={()=>imageLoaded(filteredCards.length)}/>) }));
    }
    useEffect(() => {
        applyFilter(cards)
        counter.current=0;
        setLoading(true)
    }, [searchParams])

    return (
        <>
            <div style={{ display: loading ? "none" : "block" }}>
                {loaded && <CardGrid cards={filteredCards} grid={props.grid} />}
            </div>
            {(!loaded || loading) &&
                <div className={`middle loading-div ${(!loaded || loading) && 'visible'}`}>
                    <img src={loadingGIF} />
                </div>}
        </>
    );
};