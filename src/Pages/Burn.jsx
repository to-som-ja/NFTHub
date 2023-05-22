import React from "react";
import { useLocation } from "react-router-dom";

function Burn() {
    const location = useLocation()
    console.log(location);
    return (
        <div >
            HELLO WORLD
        </div>
    )
};
export default Burn;