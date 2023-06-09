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
import Check from "../Icons/check_3.svg"
import Cancel from "../Icons/cancel.svg"
import BlackBoxImg from "../Images/BlackBox.png"
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import MinterABI from "../abis/Minter.json";
import Web3 from 'web3';
import loading from '../Images/loading.gif';
import BackLogo from "../Icons/Group_84.svg";

export default function Packs() {
    const { active, account } = useWeb3React();
    if (!active) { return <Navigate to="/NFTHub/" /> };
    const navigate = useNavigate();
    const location = useLocation();
    const [card, setCard] = useState(location.state);
    const [mobileStage, setMobileStage] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
    const [loaded, setLoaded] = useState(false);
    const [packs, setPacks] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const [burnTxHash, setBurnTxHash] = useState();
    const [openingState, setOpeningState] = useState(0);
    const [openQuantity, setOpenQuantity] = card === null ? useState(0) : useState(1);
    const [errMessage, setErrMessage] = useState();
    const [key, setKey] = useState();
    const { library } = useWeb3React();
    const handleResize = () => {
        if (window.innerWidth < 768) {
            setIsMobile(true)

        } else {
            setIsMobile(false)
        }
    }
    useEffect(() => {
        window.addEventListener("resize", handleResize)
    })
    axios.defaults.headers.common['CF-Access-Client-Id'] = 'ee3609e2c3b9626bb9128eb707f93afa.access'
    axios.defaults.headers.common['CF-Access-Client-Secret'] = '453c91ec9153b8989820d1bbc72b71f81f5c1f9f1f879499a8ab24e118ac0864'


    if (card != location.state && location.state != null) {
        setCard(location.state)
        if (isMobile) setMobileStage(1)
    }
    useEffect(() => {
        setLoaded(false);
        axios.get(`https://api-staging.thewatch.com/api/users/0x03818E2b69Cb63eCD8763B9B0f275d7f8995aF1a/items`)
            .then((response) => {
                const items = response.data.data.items
                for (let index = 0; index < items.length; index++) {
                    items[index].id = index
                }

                const filtCards = items.filter(card => { return card.flags[0] === "openable" || card.flags[0] === "burnable" })
                setFilteredCards(filtCards)
                if (card == null) {
                    setCard(filtCards[0]);
                    filtCards[0].active = true;
                } else {
                    filtCards.find(item => item.id == card.id).active = true
                    if (isMobile) setMobileStage(1)
                }
                setPacks(filtCards.map((item) => { return (<Card {...item} key={item.id} active={item.active != undefined && !isMobile} onLoadImage={() => { }} />) }));
                setLoaded(true);
            })
    }, []);

    useEffect(() => {
        setOpeningState(0);
        if (card != null && card.quantity > 0) setOpenQuantity(1)
        setKey(Math.random())
        if (filteredCards != undefined) {
            setPacks(filteredCards.map((item) => { return (<Card {...item} id={item.id} key={item.id} active={item.id == card.id && !isMobile} onLoadImage={() => { }} />) }));
        }
    }, [card])


    /*Contract.setProvider(library.provider);*/
    /*const minterContract = new library.eth.Contract(MinterABI,"0x997aA28eC7F1340C5e345C68b73Eb27aE0400D1E");*/
    const web3 = new Web3(library.provider);
    const minterContract = new web3.eth.Contract(MinterABI, "0x997aA28eC7F1340C5e345C68b73Eb27aE0400D1E");
    var txHash
    const burnBoxes = () => {
        console.log(openQuantity)
        minterContract.methods
            .burn(card.tokenId, openQuantity)
            .send({ from: account })
            .on("transactionHash", (hash) => {
                setErrMessage();
                setBurnTxHash(hash);
                txHash = hash
                console.log("txHash", txHash);
            })
            .on("receipt", (receipt) => {
                console.log("receipt", receipt);
            })
            .on("confirmation", (confirmationNumber, receipt) => {
                if (confirmationNumber == 2) {
                    console.log(confirmationNumber, receipt);
                    setTimeout(() => {
                        console.log("phase2")
                    }, 5000);
                    axios.get(`https://api-staging.thewatch.com/api/box/status/${txHash}`).then((response) => {
                        const data = response.data;
                        console.log("data", data);

                    });
                }
            })
            .on("error", (err) => {
                console.log("err", err);
                setErrMessage("Error burning boxes");
            });
    };

    const revealBoxes = async () => {
        const signatureold = await library.eth.personal.sign(
            `${account}:${dropId}:${userOpens}`,
            account
        );
        console.log(signature)
        const signature = web3.eth.personal.sign(
            `${account}:${card.tokenId}:${openQuantity}`,
            account
        );
    };

    return (
        <>
            {!isMobile && <div className='packs-page'>
                <LeftPanel />
                <div className="main-div" style={{ left: "5rem" }}>
                    {active && (<Header filter="packs" />)}
                    {!active &&
                        <div className='mobile-header'>
                            <div className="mobile-header-corner">
                                <img className="mobile-header-logo" src={FrontierLogo} />
                            </div>
                        </div>
                    }
                    <div className='packs-main-content'>
                        <div className='packs-left'>
                            <div className='packs-grid'>
                                <div className='packs-grid-content'>
                                    {loaded && packs.length > 0 && <CardGrid cards={packs} grid={{ 600: 1, 1200: 2, 2000: 3, 2800: 4 }} />}
                                    {!loaded &&
                                        <div className='middle' style={{ height: "100%" }}>
                                            <img src={loading} />
                                        </div>}
                                </div>
                            </div>
                        </div>
                        <div className='packs-right'>
                            <div className='packs-top middle'>
                                <span className='packs-big-circle'></span>
                                <span className='packs-small-circle'></span>
                                <img src={BlackBoxImg} className='packs-image noselect' />
                            </div>
                            {openingState == 0 &&
                                <div className='packs-bottom'>
                                    <Counter
                                        key={key}
                                        maxNumber={card == null ? 0 : card.quantity}
                                        onChange={(value) => {
                                            setOpenQuantity(value);
                                            console.log("onChange>", openQuantity);
                                        }} />
                                    <div className='line'></div>
                                    <button className='packs-button-open middle' onClick={() => setOpeningState(1)}>
                                        <img src={openLogo} />
                                        <p className='text packs-text'>OPEN NOW</p>
                                    </button>
                                    <div className='line'></div>
                                    <a style={{ width: "100%" }} className='middle' href={card == null ? "" : `https://opensea.io/assets/ethereum/0x236672ed575e1e479b8e101aeeb920f32361f6f9/${card.tokenId}`} target="_blank" >
                                        <button className='packs-button-trade middle'>
                                            <img src={Arrow} className="packs-arrow" />
                                            <p className='text packs-text'>TRADE NOW</p>
                                        </button>
                                    </a>
                                </div>}
                            {openingState == 1 &&
                                <div className='packs-bottom-confirm middle'>
                                    <div style={{ margin: "2rem" }}>
                                        <div style={{ marginBottom: "1.5rem" }}>
                                            <h3 className='packs-confirm-h3'>WARNING</h3>
                                            <p className='packs-confirm-p'>THIS ACTION IS IRREVERSIBLE.</p>
                                        </div>
                                        <div>
                                            <button className='packs-proceed-button' onClick={burnBoxes}>
                                                <img src={Check} style={{ marginRight: "0.8rem" }} />
                                                PROCEED
                                            </button>
                                            <button className='packs-cancel-button' onClick={() => setOpeningState(0)}>
                                                <img src={Cancel} style={{ marginRight: "0.8rem" }} />
                                                CANCEL
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>}
            {isMobile && mobileStage == 0 &&
                <div className='packs-mobile-stage0'>
                    {active && (<Header filter="packs" />)}
                    <div className='packs-mobile-stage0-main'>
                        {loaded && packs.length > 0 && <CardGrid cards={packs} grid={{ 600: 1 }} />}
                    </div>
                </div>}
            {isMobile && mobileStage == 1 &&
                <div className='packs-mobile-stage1'>
                    <div className='packs-mobile-stage1-header'>
                        <div className='packs-mobile-stage1-back middle' onClick={() => setMobileStage(0)}>
                            <img src={BackLogo} />
                        </div>
                        <div className='packs-mobile-stage1-header-div'></div>
                    </div>
                    <div className='packs-top middle'>
                        <span className='packs-mobile-line'></span>
                        <span className='packs-big-circle'></span>
                        <span className='packs-small-circle'></span>
                        <img src={BlackBoxImg} className='packs-image noselect' />
                    </div>
                    {openingState == 0 &&
                        <div className='packs-mobile-stage1-footer'>
                            <h1 className='packs-mobile-stage1-name'>{card.name}</h1>
                            <Counter
                                key={key}
                                maxNumber={card == null ? 0 : card.quantity}
                                onChange={(value) => {
                                    setOpenQuantity(value);
                                    console.log("onChange>", openQuantity);
                                }} />
                            <button className='packs-button-open' onClick={() => setOpeningState(1)}>
                                <p className='text packs-text' >OPEN NOW</p>
                                <img src={openLogo} />
                            </button>
                            <a className='middle' href={card == null ? "" : `https://opensea.io/assets/ethereum/0x236672ed575e1e479b8e101aeeb920f32361f6f9/${card.tokenId}`} target="_blank" >
                                <button className='packs-button-trade'>
                                    <p className='text packs-text'>TRADE NOW</p>
                                    <img src={Arrow} className="packs-arrow" />
                                </button>
                            </a>
                        </div>}
                    {openingState == 1 &&
                        <div className='packs-bottom-confirm'>
                            <div style={{ marginBottom: "1rem" }}>
                                <h3 className='packs-confirm-h3'>WARNING</h3>
                                <p className='packs-confirm-p'>THIS ACTION IS IRREVERSIBLE.</p>
                            </div>
                            <button className='packs-proceed-button' onClick={burnBoxes}>
                                <img src={Check} style={{ marginRight: "0.8rem" }} />
                                PROCEED
                            </button>
                            <button className='packs-cancel-button' onClick={() => setOpeningState(0)}>
                                <img src={Cancel} style={{ marginRight: "0.8rem" }} />
                                CANCEL
                            </button>
                        </div>}
                </div>}
        </>
    )
};