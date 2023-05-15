import React from "react";
import "../CSS/Header.css"
import { useWeb3React } from "@web3-react/core";
import Close from "../Icons/close_4.svg";

function Header() {
  const {account, deactivate } = useWeb3React();
  return (
    <nav className="header-nav">
      <div className="header-left">
        <div>
          <ul className="header-left-corner-ul">
            <li className= "header-left-corner-li-active" >MY ITEMS</li>
            <li>\</li>
            <li>BLACK CARD</li>
            <li>\</li>
            <li>PACKS</li>
            <li>\</li>
            <li>SYNTHESIS</li>
          </ul>
        </div>
      </div>  
      <div className="header-right">
        <div className="header-right-text">
          <p className="header-right-text-p" >C:\OSXPHOENIX\PROGRAMS\PLAYER.EXE=</p>
          <p className="header-right-text-p text-white" >{`${account.substring(
                0,
                6
              )}...${account.substring(38)}`}</p>
        </div>
        <div className="header-right-corner" onClick={deactivate} >
          <img className="header-right-corner-image" src={Close} />
        </div>
      </div>
    </nav>
  );
};

export default Header;