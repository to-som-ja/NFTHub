import React, { useState, useEffect } from 'react';
import "../CSS/Header.css"
import { useWeb3React } from "@web3-react/core";
import Close from "../Icons/close_4.svg";
import FrontierLogo from "../Icons/frontier_logo.svg";
import { Link, useSearchParams } from "react-router-dom";
import {CSSTransition} from "react-transition-group";


function Header(props) {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeHeader = searchParams.get("filter") == null ? props.filter : searchParams.get("filter")
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [showMobileItems, setShowMobileItems] = useState(false)
  const [hamburgerHover, setHamburgerHover] = useState(false)
  const [smallScreen, setSmallScreen] = useState(window.innerWidth < 1000)
  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false)
      if (showMobileItems) setShowMobileItems(false)
    }
    if (window.innerWidth < 1000) {
      setSmallScreen(true);
    } else {
      setSmallScreen(false)
    }
  }

  useEffect(() => {
    setShowMobileItems(false)
  }, [searchParams])

  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })
  const showMobileItemsFunc = () => {
    setShowMobileItems(!showMobileItems)
  }
  const mouseEnter = () => {
    setHamburgerHover(!hamburgerHover)
  }
  const { account } = useWeb3React();

  return (

    <nav className="header-nav" style={{ border: props.border }}>
      <div className="header-left">
        {isMobile &&
          <>
            <div className="header-left-corner">
              <img className="header-left-logo" src={FrontierLogo} />
            </div>
            <div className="hamburger" onClick={showMobileItemsFunc} onMouseEnter={mouseEnter} onMouseLeave={mouseEnter}>
              <span className={showMobileItems ? "bar active-bar" : "bar"} style={{ backgroundColor: hamburgerHover ? "rgba(255, 255, 255, 0.7)" : "" }}></span>
              <span className={showMobileItems ? "bar active-bar" : "bar"} style={{ backgroundColor: hamburgerHover ? "rgba(255, 255, 255, 0.7)" : "" }}></span>
              <span className={showMobileItems ? "bar active-bar" : "bar"} style={{ backgroundColor: hamburgerHover ? "rgba(255, 255, 255, 0.7)" : "" }}></span>
            </div>
          </>}
        {!isMobile &&
          <ul className="header-left-corner-ul">
            <Link to="/NFTHub/?filter=all" >
              <li className={activeHeader == "all" ? "active" : ""} >MY ITEMS</li>
            </Link>
            <li className='no-hover'>\</li>
            <Link to="/NFTHub/?filter=black"  >
              <li className={activeHeader == "black" ? "active" : ""}>BLACK CARD</li>
            </Link>
            <li className='no-hover'>\</li>
            <Link to="/NFTHub/packs">
              <li className={activeHeader == "packs" ? "active" : ""}>PACKS</li>
            </Link>
            <li className='no-hover'>\</li>
            <Link to="/NFTHub/?filter=Flash"  >
              <li className={activeHeader == "Flash" ? "active" : ""}>FLASH BLOCKS</li>
            </Link>
            <li className='no-hover'>\</li>
            <Link to="/NFTHub/?filter=Glitch"  >
              <li className={activeHeader == "Glitch" ? "active" : ""}>GLITCH BLOCKS</li>
            </Link>
            <li className='no-hover'>\</li>
            <Link to="/NFTHub/?filter=Utility"  >
              <li className={activeHeader == "Utility" ? "active" : ""}>UTILITY</li>
            </Link>
            <li className='no-hover'>\</li>
            <Link to="/NFTHub/?filter=Units"  >
              <li className={activeHeader == "Units" ? "active" : ""}>UNITS</li>
            </Link>
          </ul>}
      </div>
      <div className="header-right">
        {!isMobile && <div className="header-right-text" >
          {!smallScreen && <p className="header-right-text-p" >C:\OSXPHOENIX\PROGRAMS\PLAYER.EXE=</p>}
          <p className="header-right-text-p" style={{ color: "white" }} >{`${account.substring(0, 6)}...${account.substring(38)}`}</p>
        </div>}
        <Link to="/NFTHub/disconnect" >
          <div className="header-right-corner" >
            <img className="header-right-corner-image" src={Close} />
          </div>
        </Link>
      </div>
      <CSSTransition
        in={showMobileItems}
        timeout={300}
        classNames="header-transition"
      >
        <div className='header-mobile-items'>
          <ul className="header-mobile-items-ul">
            <Link to="/NFTHub/?filter=all" >
              <li className={activeHeader == "all" ? "active" : ""} >/ MY ITEMS</li>
            </Link>
            <Link to="/NFTHub/?filter=black"  >
              <li className={activeHeader == "black" ? "active" : ""}>/ BLACK CARD</li>
            </Link>
            <Link to="/NFTHub/packs">
              <li className={activeHeader == "packs" ? "active" : ""}>/ PACKS</li>
            </Link>
            <Link to="/NFTHub/?filter=Flash"  >
              <li className={activeHeader == "Flash" ? "active" : ""}>/ FLASH BLOCKS</li>
            </Link>
            <Link to="/NFTHub/?filter=Glitch"  >
              <li className={activeHeader == "Glitch" ? "active" : ""}>/ GLITCH BLOCKS</li>
            </Link>
            <Link to="/NFTHub/?filter=Utility"  >
              <li className={activeHeader == "Utility" ? "active" : ""}>/ UTILITY</li>
            </Link>
            <Link to="/NFTHub/?filter=Units"  >
              <li className={activeHeader == "Units" ? "active" : ""}>/ UNITS</li>
            </Link>
          </ul>
        </div>
      </CSSTransition>

    </nav>
  );
};

export default Header;