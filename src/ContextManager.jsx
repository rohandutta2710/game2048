// CreateContext and useContext is used to define all the states in file 
// so that they could easily maintained 
// If i wrap all the components in which i have created the Context then in the child components of this Context i can access all the states.
import React, { createContext, useState } from "react";
const gameContext = createContext();
const ContextManager = (props) => {
    const [myscore, setMyScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [classState, setClassState] = useState(null); //used for animation scale 0 and 1
    const [stateArray, setStateArray] = useState([[0, 0, 0, 0], [2, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]);
    const [addScore, setAddScore] = useState({ addsc: 0, addClass: "" }); //used to show the +8,+4 over score
    const [gameFinish, setGameFinish] = useState({ display: "none" }) //finishing game div
    const bgColor = {
        "0": {
            backgroundColor: "#dacdc0",
            color: "#776E65"
        },
        "2": {
            backgroundColor: "#eee4da",
            color: "#776E65"
        },
        "4": {
            backgroundColor: "#ede0c8",
            color: "#776E65"
        },
        "8": {
            backgroundColor: "#f2b179",
            color: "#f9f6f2"
        },
        "16": {
            backgroundColor: "#f59563",
            color: "#f9f6f2"
        },
        "32": {
            backgroundColor: "#f67c5f",
            color: "#f9f6f2"
        },
        "64": {
            backgroundColor: "#f65e3b",
            color: "#f9f6f2"
        },
        "128": {
            backgroundColor: "#edcf72",
            color: "white"
        },
        "256": {
            backgroundColor: "dodgerblue",
            color: "white"
        },
        "512": {
            backgroundColor: "royalblue",
            color: "#f9f6f2"
        },
        "1024": {
            backgroundColor: "teal",
            color: "white",
        },
        "2048": {
            backgroundColor: "gold",
            color: "#776E65",
        },
        "4096": {
            backgroundColor: "pink",
            color: "#776E65",
        }
    };

    return (
        <gameContext.Provider value={{ bgColor, myscore, setMyScore, bestScore, setBestScore, classState, setClassState, stateArray, setStateArray, addScore, setAddScore, gameFinish, setGameFinish, }}>
            {props.children}
        </gameContext.Provider>
    );
}

export default ContextManager;
export { gameContext };