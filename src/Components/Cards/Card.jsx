import "../../CSS/Card.css"
import CardIcon from "../../Icons/double_triangle.svg"
import Arrow from "../../Icons/Arrow.svg"
import Flag from "../../Icons/Flag.svg"
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export default function Card(props) {
  const [hover, setHover] = useState(false);
  const openable = props.flags[0] === "openable" || props.flags[0] === "burnable";
  const link = openable ? "/NFTHub/packs" : "/NFTHub/info";
  const [icon, setIcon] = useState(CardIcon);
  useEffect(() => {
    const atr = props.metadata.attributes
    if (atr != undefined) {
      if (atr.find((element) => { return element.trait_type === "Block"; }) != undefined) setIcon("https://uploads-ssl.webflow.com/63e68367601a460550796587/63e68367601a466726796a8c_Abstract%20icon%20070.png");
      if (atr.find((element) => { return element.trait_type === "Unit"; }) != undefined) setIcon("https://uploads-ssl.webflow.com/63e68367601a460550796587/63e68367601a468411796a8d_Abstract%20icon%20086.png")

    }
    if (props.flags[0] != undefined) setIcon("https://uploads-ssl.webflow.com/63e68367601a460550796587/63e68367601a466872796a8b_Abstract%2520icon%2520089-p-2000.png")
  }, [])
  return (

    <div className="Card" style={{ maxWidth: props.width }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <Link to={link} state={props}>
        <img src={props.image} className="card-image" loading="lazy" />
        {props.flags[0] != undefined && <div className="card-flag middle">
          <img src={Flag} />
        </div>}
        <div style={{ backgroundColor: hover || props.active ? "white" : "black" }} className="card-text">
          <div className="card-text-left">
            <img style={{ filter: hover || props.active ? "invert(100%)" : "" }} src={icon} />
            <p style={{ filter: hover || props.active ? "invert(100%)" : "" }} >{props.name}</p>
          </div>
          {((!hover) || (hover && props.active)) &&
            <div className="card-quantity middle">
              <p style={{ filter: props.active ? "invert(100%)" : "" }}>{props.quantity}</p>
            </div>
          }
          {hover && !props.active && <img src={Arrow} className="card-arrow" />}
        </div>
      </Link>
    </div>

  );
};