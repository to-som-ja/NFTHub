import React from "react";
import "../../CSS/Hub.css"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

export const CardGrid = (props) => {
  const { cards, grid } = props


  return (<>
    <ResponsiveMasonry
      columnsCountBreakPoints={grid}
    >
      <Masonry gutter="2rem">
        {cards}
      </Masonry>
    </ResponsiveMasonry>
    <div style={{ height: "4rem" }}></div>
  </>
  );
}
