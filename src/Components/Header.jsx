import React from "react";
import "../CSS/Header.css"

function Header() {
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
          <p>0x...32EE</p>
        </div>
        <div className="header-right-corner">
          <img className="header-right-corner-image" src="https://img.icons8.com/ios-glyphs/30/null/delete-sign.png" />
        </div>
      </div>
    </nav>
  );
};

export default Header;