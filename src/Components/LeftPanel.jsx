import React, { useState, useEffect } from 'react';
import "../CSS/LeftPanel.css"
import FrontierLogo from "../Icons/frontier_logo.svg";


function LeftPanel() {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  //choose the screen size 
  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })

  return (
    <>
      {!isMobile &&
        <div className="panel">
          <div className="panel-up-corner">
            <img className="panel-up-corner-logo" src={FrontierLogo} />
          </div>
          <div className="panel-middle panel-text">
            <p>// THE WATCH COMPANY</p>
          </div>
          <div className="panel-down panel-text">
            <p>001</p>
          </div>
        </div>
      }
    </>
  );
};

export default LeftPanel;