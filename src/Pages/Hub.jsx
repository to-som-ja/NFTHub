import React from "react";
import { useWeb3React } from "@web3-react/core";
import { Injected, WalletConnect } from "../Connectors";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import CardGrid from "../Components/Cards/CardGrid";
import "../CSS/Hub.css"

function Hub() {
    const { activate, deactivate } = useWeb3React();
    const { active, chainId, account } = useWeb3React();
    return (
        <div className="hub">
            {active && (<Header />)}
            <div className="main-div">
                {!active && (
                    <div className="main-div-login">
                        <div className="main-div-text-box">
                            <h1 className="text main-div-h">CONNECT TO HUB</h1>
                        </div>
                        <div className="main-div-text-box">
                            <p className="text main-div-p">TO INTERACT WITH YOUR WATCH NFTs, CONNECT YOUR WALLET USING ONE OF THE OPTIONS BELOW</p>
                        </div>
                        <button className="main-div-button text" onClick={() => { activate(Injected) }}>METAMASK</button>
                        <button className="main-div-button text" onClick={() => { activate(WalletConnect, undefined, true).catch((err) => { console.log(err); }); }}>WALLET CONNECT</button>
                    </div>)}
                {active && (<CardGrid />)}
            </div>
            <Footer />
        </div>
    )
};
export default Hub;