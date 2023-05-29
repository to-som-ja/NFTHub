import "../../CSS/Card.css"
import CardIcon from "../../Icons/double_triangle.svg"
import Arrow from "../../Icons/Arrow.svg"
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export default function Card(props) {
  const [hover, setHover] = useState(false);
  const openable = props.flags[0] === "openable" || props.flags[0] === "burnable";
  const link = openable?"/NFTHub/packs":"/NFTHub/info";
  return (

    <div className="Card" style={{width:props.width}}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <Link to={link} state={props}>
        <img src={props.image} className="card-image" />
        <div style={{ backgroundColor: hover ? "white" : "black" }} className="card-text">
          <div className="card-text-left">
            <img style={{ filter: hover ? "invert(100%)" : "" }} src={CardIcon} />
            <p style={{ filter: hover ? "invert(100%)" : "" }} >{props.name}</p>
          </div>
          {hover && <img src={Arrow} className="card-arrow" />}
        </div>
      </Link>
    </div>

  );
};