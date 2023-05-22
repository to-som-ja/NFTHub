import React from "react";
import "../../CSS/Hub.css"

export const CardGrid = (props) => {
  return (
    <div className="card-grid">
        {props.cards}
    </div>
  );
};
