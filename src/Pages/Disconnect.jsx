import "../CSS/Disconnect.css"
import BackLogo from "../Icons/Group_84.svg";
import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";

export default function Disconnect() {
    const { active, account } = useWeb3React();
    const navigate = useNavigate();
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

    if (!active) { return <Navigate to="/NFTHub/" /> };

    const goToPage = () => {
        navigate("/NFTHub/");
        navigate(0);
    }
    return (
        <div className="disconnect">
            {!isMobile &&
                <div className="panel">
                    <div className="panel-up-corner back-hover" onClick={() => navigate(-1)}>
                        <img className="panel-up-corner-logo" src={BackLogo} style={{ filter: "invert(0%)" }} />
                    </div>
                    <div className="panel-middle panel-text">
                        <p>// THE WATCH COMPANY</p>
                    </div>
                    <div className="panel-down panel-text">
                        <p>001</p>
                    </div>
                </div>}
            <div className="main-div" style={{ left: (isMobile) ? "0" : "5rem" }}>
                {isMobile &&
                    <div className='mobile-header'>
                        <div className="mobile-header-corner back-hover" onClick={() => navigate(-1)}>
                            <img className="mobile-header-logo back" style={{ filter: "invert(0%)" }} src={BackLogo} />
                        </div>
                    </div>
                }
                <div className="main-div-login">
                    <div className="main-div-text-box">
                        <h1 className="text main-div-h">CONNECTECTED WALLET</h1>
                    </div>
                    <div className="main-div-text-box">
                        <p className="text main-div-p">{`${account.substring(0, 4)}...${account.substring(36)}`}</p>
                    </div>
                    <button className="main-div-button text" onClick={goToPage}>WALLET DISCONNECT</button>
                </div>
                {isMobile &&
                    <>
                        <div className='mobile-footer'>
                            <p className="mobile-footer-middle" >// THE WATCH COMPANY</p>
                        </div>
                        <p className="mobile-footer-left">001</p>
                    </>
                }
            </div>
        </div>
    )
};