import React, { useState, useEffect } from 'react';
import { useWeb3React } from "@web3-react/core";
import { Injected, WalletConnect } from "../Connectors";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import LeftPanel from "../Components/LeftPanel"
import "../CSS/Hub.css"
import CardManager from "../Components/Cards/CardManager";
import FrontierLogo from "../Icons/frontier_logo.svg";
import { useLocation } from "react-router-dom";
import Web3Modal from "web3modal";


function Hub() {



    const { activate, deactivate } = useWeb3React();
    const { active, chainId, account } = useWeb3React();

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
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

    return (
        <div className="hub">
            <LeftPanel />
            <div className="main-div" style={{ left: (isMobile) ? "0" : "5rem" }}>
                {active && (<Header filter="all"/>)}
                {isMobile && !active &&
                    <div className='mobile-header'>
                        <div className="mobile-header-corner">
                            <img className="mobile-header-logo" src={FrontierLogo} />
                        </div>
                    </div>
                }
                {!active &&
                    <div className="main-div-login">
                        <div className="main-div-text-box">
                            <h1 className="text main-div-h">CONNECT TO THE HUB</h1>
                        </div>
                        <div className="main-div-text-box" style={{width:"70%"}}>
                            <p className="text main-div-p" >TO INTERACT WITH YOUR WATCH NFTs, CONNECT YOUR WALLET USING ONE OF THE OPTIONS BELOW</p>
                        </div>
                        <button className="main-div-button text" onClick={() => { activate(Injected) }}>METAMASK</button>
                        <button className="main-div-button text" onClick={() => { activate(WalletConnect, undefined, true).catch((err) => { console.log(err); }); }}>WALLET CONNECT</button>
                    </div>}
                {active &&
                    <div className='main-content'>
                        <CardManager  grid={{ 500: 1, 600: 2, 1200: 3, 1800: 4 , 2400:5, 3000:6}}/>
                    </div>}
                {!active && <Footer />}
            </div>
        </div>
    )
};
export default Hub;