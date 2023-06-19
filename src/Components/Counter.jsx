import React, { useEffect, useState } from "react";
import "../CSS/Counter.css"
import Minus from "../Icons/MinusIcon.svg"
import Plus  from "../Icons/PlusIcon.svg"
export default function Counter(props) {
    const { maxNumber, onChange, darkMode } = props;
    const [number, setNumber] = useState(1);

    useEffect(() => {
        setNumber(1);
        if (maxNumber == 0) {
            setNumber(0);
        }
    }, [maxNumber]);


    const plusClick = () => {
        if (number + 1 <= maxNumber) {
            setNumber(number + 1);
            onChange(number + 1);
        }
    };

    const minusClick = () => {
        if (number - 1 > 0) {
            setNumber(number - 1);
            onChange(number - 1);
        }
    };

    return (
        <div className="counter">
            <div className="counter-button middle " onClick={minusClick}>
                <img className="noselect counter-button-img" src={Minus} />
            </div>
            <div className="middle counter-mid">
                <p className="counter-text">{number}</p>
            </div>
            <div className="counter-button middle" onClick={plusClick}>
                <img src={Minus} className="noselect counter-button-img" />
                <img src={Minus} className="noselect counter-button-img-2" style={{transform: "rotate(90deg)", position: "absolute"}}/>
            </div>
        </div>
    );
};

