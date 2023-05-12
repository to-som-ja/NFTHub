import React from "react";
import "../CSS/LeftPanel.css"
import { ReactSVG } from 'react-svg'
import FrontierLogo from "../Icons/frontier_logo.svg";


function LeftPanel() {
  return (
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
  );
};

export default LeftPanel;