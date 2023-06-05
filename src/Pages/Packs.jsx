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


export default function Packs() {
    const { active, account} = useWeb3React();
    if (!active) { return <Navigate to="/NFTHub/" /> };
    const location = useLocation();
    const [card, setCard] = useState(location.state);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
    const [loaded, setLoaded] = useState(false);
    const [packs, setPacks] = useState([]);
    const [burnTxHash, setBurnTxHash] = useState();
    const [openingState, setOpeningState] = useState(0);
    const [openQuantity, setOpenQuantity] = card === null ? useState(0) :useState(1);
    const [errMessage, setErrMessage] = useState();
    const [key, setKey] = useState();
    const { library} = useWeb3React();
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
                setPacks(filteredCards.map(item => { return (<Card key={item.id} {...item} />) }));
                setLoaded(true);
                if (card == null) { setCard(filteredCards[0]) };
            })
    }, []);
    useEffect(()=>{
        setOpeningState(0);
        if(card!=null && card.quantity>0) setOpenQuantity(1)
        setKey(Math.random())
    },[card])


    /*Contract.setProvider(library.provider);*/
    /*const minterContract = new library.eth.Contract(MinterABI,"0x997aA28eC7F1340C5e345C68b73Eb27aE0400D1E");*/
    const web3 = new Web3(library.provider);
    const minterContract = new web3.eth.Contract(MinterABI,"0x997aA28eC7F1340C5e345C68b73Eb27aE0400D1E");
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
            console.log(confirmationNumber, receipt);
            if (confirmationNumber == 2) {
              setTimeout(() => {
                console.log("phase2")
              }, 5000);
              axios.get(`https://api-staging.thewatch.com/api/box/status/${txHash}`).then((response) => {
                const data = response.data;
                console.log("data",data);
                
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
        <div className='packs-page'>
            <LeftPanel />
            <div className="main-div" style={{ left: (isMobile) ? "0" : "5rem" }}>
                {active && (<Header filter="packs" />)}
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
                            <div style={{ marginInline: "2rem", marginTop: "2rem" }}>
                                {loaded && packs.length > 0 && <CardGrid cards={packs} grid={{ 600: 1, 1200: 2, 2000: 3, 2800: 4 }} />}
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
                        {openingState == 0 &&
                            <div className='packs-bottom'>
                                <Counter
                                    key = {key}
                                    maxNumber={card === null ? 0 : card.quantity}
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
                                <a style={{ width: "100%" }} className='middle' href={card === null ? "" : `https://opensea.io/assets/ethereum/0x236672ed575e1e479b8e101aeeb920f32361f6f9/${card.tokenId}`} target="_blank" >
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
        </div>
    )
};