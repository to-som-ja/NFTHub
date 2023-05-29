import Card from '../Components/Cards/Card'
import { CardGrid } from "../Components/Cards/CardGrid";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useWeb3React } from "@web3-react/core";
import LeftPanel from "../Components/LeftPanel"
import Header from "../Components/Header";
import Counter from "../Components/Counter";
import "../CSS/Packs.css";
import openLogo from "../Icons/BE_icon 1.svg";
import Arrow from "../Icons/Arrow.svg"
import BlackBoxImg from "../Images/BlackBox.png"
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Packs() {
    const { active, account } = useWeb3React();
    if (!active) { return <Navigate to="/NFTHub/" /> };
    const location = useLocation();
    const [card, setCard] = useState(location.state);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
    const [loaded, setLoaded] = useState(false);
    const [packs, setPacks] = useState([]);
    const handleResize = () => {
        if (window.innerWidth < 768) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }
    if (card != location.state && location.state != null) setCard(location.state)
    useEffect(() => {
        window.addEventListener("resize", handleResize)
    })
    axios.defaults.headers.common['CF-Access-Client-Id'] = 'ee3609e2c3b9626bb9128eb707f93afa.access'
    axios.defaults.headers.common['CF-Access-Client-Secret'] = '453c91ec9153b8989820d1bbc72b71f81f5c1f9f1f879499a8ab24e118ac0864'

    useEffect(() => {
        setLoaded(false);
        axios.get(`https://api-staging.thewatch.com/api/users/0x03818E2b69Cb63eCD8763B9B0f275d7f8995aF1a/items`)
            .then((response) => {
                const cards = response.data.data.items;
                const filteredCards = cards.filter(card => { return card.flags[0] === "openable" || card.flags[0] === "burnable" })
                setPacks(filteredCards.map(item => { return (<Card key={item.id} {...item} width="22rem" />) }));
                setLoaded(true);
                if (card == null) { setCard(filteredCards[0]) };
            })
    }, []);

    return (
        <div className='packs-page'>
            <LeftPanel />
            <div className="main-div" style={{ left: (isMobile) ? "0" : "5rem" }}>
                {active && (<Header border="none" filter="packs" />)}
                {isMobile && !active &&
                    <div className='mobile-header'>
                        <div className="mobile-header-corner">
                            <img className="mobile-header-logo" src={FrontierLogo} />
                        </div>
                    </div>
                }
                <div className='packs-main-content'>
                    <div className='packs-left'>
                        <div className='packs-grid'>
                            <div style={{marginInline:"2rem", marginTop:"2rem"}}>
                                {loaded && packs.length > 0 && <CardGrid cards={packs} grid={{ 600: 1, 1100: 2 }} />}
                                {!loaded && <h1> NACITAVAM</h1>}
                            </div>
                        </div>
                    </div>
                    <div className='packs-right'>
                        <div className='packs-top middle'>
                            <span className='packs-big-circle'></span>
                            <span className='packs-small-circle'></span>
                            <img src={BlackBoxImg} className='packs-image noselect' />
                        </div>
                        <div className='packs-bottom'>
                            <Counter
                                maxNumber={card === null ? 0 : card.quantity}
                                onChange={(value) => {
                                    console.log("onChange>", value);
                                }} />
                            <div className='line'></div>
                            <button className='packs-button-open middle'>
                                <img src={openLogo} />
                                <p className='text packs-text'>OPEN NOW</p>
                            </button>
                            <div className='line'></div>
                            <a style={{ width: "100%" }} className='middle' href={card === null ? "" : `https://opensea.io/assets/ethereum/0x236672ed575e1e479b8e101aeeb920f32361f6f9/${card.tokenId}`} target="_blank" >
                                <button className='packs-button-trade middle'>
                                    <img src={Arrow} className="packs-arrow" />
                                    <p className='text packs-text'>TRADE NOW</p>
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};