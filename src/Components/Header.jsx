import React, { useState, useEffect } from 'react';
import "../CSS/Header.css"
import { useWeb3React } from "@web3-react/core";
import Close from "../Icons/close_4.svg";
import FrontierLogo from "../Icons/frontier_logo.svg";
import { Link } from "react-router-dom";


function Header() {
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

  const { account} = useWeb3React();
  return (

    <nav className="header-nav">
      <div className="header-left">
        {isMobile && <div className="header-left-corner">
          <img className="header-left-logo" src={FrontierLogo} />
        </div>}
        <div className="hamburger" style={{ display: isMobile ? "block" : "none" }}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        {!isMobile && <ul className="header-left-corner-ul">
          <li className="header-left-corner-li-active" >MY ITEMS</li>
          <li>\</li>
          <li>BLACK CARD</li>
          <li>\</li>
          <li>PACKS</li>
          <li>\</li>
          <li>SYNTHESIS</li>
        </ul>}
      </div>
      <div className="header-right">
        {!isMobile && <div className="header-right-text" >
          <p className="header-right-text-p" >C:\OSXPHOENIX\PROGRAMS\PLAYER.EXE=</p>
          <p className="header-right-text-p" style={{ color: "white" }} >{`${account.substring(
            0,
            6
          )}...${account.substring(38)}`}</p>
        </div>}
        <Link to="/NFTHub/disconnect" >
          <div className="header-right-corner" >
            <img className="header-right-corner-image" src={Close} />
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Header;