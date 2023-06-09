import React from "react";
import "../../CSS/Hub.css"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

export const CardGrid = (props) => {



  return (<>
    <ResponsiveMasonry
      columnsCountBreakPoints={props.grid}
    >
      <Masonry gutter="2rem">
        {props.cards}
      </Masonry>
      <div style={{height:"4rem"}}></div>
    </ResponsiveMasonry>
    
  </>
  );
}
