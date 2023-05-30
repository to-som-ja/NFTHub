import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import "../CSS/Info.css"
import BackLogo from "../Icons/Group_84.svg";
import CheckIcon from "../Icons/check.svg";
import { useNavigate, Navigate, Link } from "react-router-dom";
import Arrow from "../Icons/Arrow.svg"

export function Info() {
    const card = useLocation().state;
    const navigate = useNavigate();
    const [hover, setHover] = useState(false);
    if (card === null) { return <Navigate to="/NFTHub/" /> };
    const attributes = card.metadata.attributes;
    const tier = attributes === undefined ? "" : (attributes.find((element) => { return element.trait_type === "Tier"; }));
    const value = tier === undefined || tier === "" ? "" : tier.value;
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1000)
    const handleResize = () => {
        if (window.innerWidth < 1000) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }
    useEffect(() => {
        window.addEventListener("resize", handleResize)
    })

    return (
        <div className="info-main">
            <div className="info-main-left" >
                <div className="info-main-left-background" style={{ backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.31), rgba(0, 0, 0, 0.31)),url(${card.image})` }}>
                </div>
                <div className="info-header">
                    <div className="info-header-back middle" onClick={() => navigate(-1)}>
                        <img className="info-header-back-logo" src={BackLogo} />
                    </div>
                    <div className="info-header-div"></div>
                </div>
                <div className="info-left-main">
                    <div className="info-left-panel"></div>
                    <img src={card.image} />
                </div>
            </div>
            <div className="info-main-right middle">
                <div className="info-main-right-block">
                    <div className='info-mobile-group'>
                        {isMobile && <h1>{card.name}</h1>}
                        <div className="info-main-right-owned">
                            <div className="green-box middle">
                                <img src={CheckIcon} className="green-check" />
                            </div>
                            <p className="info-main-right-owned-text">OWNED</p>
                        </div>
                        {!isMobile && <h1>{card.name}</h1>}
                    </div>
                    <div className="info-description middle">
                        <p>{card.metadata.description}</p>
                    </div>
                    {
                        value != "" &&
                        <div className="info-tier">
                            <h3>TIER</h3>
                            <p className="text-white">{value}</p>
                        </div>
                    }

                    <div className="info-quantity">
                        <h3>HOLDING</h3>
                        <p className="text-white">{card.quantity} OF 3,000</p>
                    </div>
                    <a href={`https://opensea.io/assets/ethereum/0x236672ed575e1e479b8e101aeeb920f32361f6f9/${card.tokenId}`} target="_blank" style={{margin:'2rem 0'}} >
                        <div className="info-link"
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}>
                            <p className="text-white" style={{ filter: hover ? "invert(100%)" : "" }}>TRADE NOW</p>
                            <img src={Arrow} className="card-arrow" style={{ filter: hover ? "invert(0%)" : "" }} />
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
};