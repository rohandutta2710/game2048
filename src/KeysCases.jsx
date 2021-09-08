import React, { useEffect, useContext } from 'react';
import { SwipeEventListener } from 'swipe-event-listener';
import { gameContext } from './ContextManager';
import { returnArr } from "./CustomHook.jsx";
const { swipeArea } = SwipeEventListener({
    swipeArea: document.querySelector('body'),
});
var run = 1;    //make for checking the gameOver and adding the extra 2 in the block
var addingScore = 0;    //make to show the +score over the Score box with animation
function KeysCases(props) {
    const usingContext = useContext(gameContext);
    var testRef = props.propref.current;  //jugar for addEventListener
    let removeListener = 1;
    let virtualArray = usingContext.stateArray;
    let score = usingContext.myscore;  //score that will display in the score box
    function upKeyPress() {
        virtualArray = [];
        addingScore = 0;
        // [...virtualArray] = usingContext.stateArray ;
        [score, virtualArray] = returnArr();
        let virtualLength = virtualArray.length;
        //making all the pair and adding them rowwise going up to down
        for (let i = 0; i < virtualLength; i++) {
            for (let j = 0; j < virtualLength - 1; j++) {
                if (virtualArray[j][i] !== 0) {
                    for (let k = j + 1; k < virtualLength; k++) {
                        if (virtualArray[j][i] === virtualArray[k][i]) {
                            virtualArray[j][i] = virtualArray[j][i] + virtualArray[k][i];
                            addingScore = addingScore + virtualArray[j][i];
                            score = score + virtualArray[j][i];
                            virtualArray[k][i] = 0;
                            break;
                        }
                        else if ((virtualArray[j][i] !== virtualArray[k][i]) && virtualArray[k][i] !== 0) {
                            break;
                        }
                    }
                }
            }
        }
        usingContext.setMyScore(score);
        usingContext.setAddScore({ addsc: addingScore, addClass: "add-translate" });
        // placing all the added or not added combination in a sequence up to down
        for (let i = 0; i < virtualLength; i++) {
            let start = 0;
            for (let j = 0; j < virtualLength; j++) {
                if (virtualArray[j][i] !== 0) {
                    virtualArray[start][i] = virtualArray[j][i]
                    if (start !== j) {
                        virtualArray[j][i] = 0;
                    }
                    start++;
                }
            }
        }
        run = 1;
        usingContext.setStateArray(virtualArray);
        return;
    }
    function downKeyPress() {
        addingScore = 0;
        virtualArray = [];
        // [...virtualArray] =  usingContext.stateArray;
        [score, virtualArray] = returnArr();
        let virtualLength = virtualArray.length;
        //making all the pair and adding them rowwise going up to down
        for (let i = 0; i < virtualLength; i++) {
            for (let j = virtualLength - 1; j > 0; j--) {
                if (virtualArray[j][i] !== 0) {
                    for (let k = j - 1; k >= 0; k--) {
                        if (virtualArray[j][i] === virtualArray[k][i]) {
                            virtualArray[j][i] = virtualArray[j][i] + virtualArray[k][i];
                            addingScore = addingScore + virtualArray[j][i];
                            score = score + virtualArray[j][i];
                            virtualArray[k][i] = 0;
                            break;
                        }
                        else if (virtualArray[k][i] !== 0 && (virtualArray[j][i] !== virtualArray[k][i])) {
                            break;
                        }
                    }
                }
            }
        }
        usingContext.setMyScore(score);
        usingContext.setAddScore({ addsc: addingScore, addClass: "add-translate" });
        // placing all the added or not added combination in a sequence up to down
        for (let i = 0; i < virtualLength; i++) {
            let end = virtualLength - 1;
            for (let j = virtualLength - 1; j >= 0; j--) {
                if (virtualArray[j][i] !== 0) {
                    virtualArray[end][i] = virtualArray[j][i]
                    if (end !== j) {
                        virtualArray[j][i] = 0;
                    }
                    end--;
                }
            }
        }
        run = 1;
        usingContext.setStateArray(virtualArray);
        return;
    }

    function rightKeyPress() {
        addingScore = 0;
        virtualArray = [];
        // [...virtualArray] =  usingContext.stateArray;
        [score, virtualArray] = returnArr();
        //making all the pair and adding them 0 2 2 2 --> 0 2 0 4 (ex:-0 2 0 2-->0 0 0 4) (after executing of beneath code)
        for (let i of virtualArray) {
            for (let j = i.length - 1; j > 0; j--) {
                if (i[j] !== 0) {
                    for (let k = j - 1; k >= 0; k--) {
                        if (i[j] === i[k]) {
                            i[j] = i[j] + i[k];
                            addingScore = addingScore + i[j];
                            score = score + i[j];
                            i[k] = 0;
                            break;
                        }
                        else if (i[k] !== 0 && (i[j] !== i[k])) {
                            break;
                        }
                    }
                }
            }
        }
        usingContext.setMyScore(score);
        usingContext.setAddScore({ addsc: addingScore, addClass: "add-translate" });
        // placing all the added or not added combination in a sequence 0 2 0 4 --> 0 0 2 4(after executing of beneath code)
        for (let i of virtualArray) {
            let end = i.length - 1;
            for (let j = i.length - 1; j >= 0; j--) {
                if (i[j] !== 0) {
                    i[end] = i[j];
                    if (end !== j) {
                        i[j] = 0;
                    }
                    end--;
                }
            }
        }
        usingContext.setStateArray(virtualArray);
        run = 1;
        return;
    }
    function leftKeyPress() {
        addingScore = 0;
        virtualArray = [];
        // [...virtualArray] = usingContext.stateArray;
        [score, virtualArray] = returnArr();
        //making all the pair and adding them 0 2 2 2 --> 0 4 0 2(after executing of beneath code)
        for (let i of virtualArray) {
            for (let j = 0; j < i.length - 1; j++) {
                if (i[j] !== 0) {
                    for (let k = j + 1; k <= i.length - 1; k++) {
                        if (i[j] === i[k]) {
                            i[j] = i[j] + i[k];
                            addingScore = addingScore + i[j];
                            score = score + i[j];
                            i[k] = 0;
                            break;
                        }
                        else if (i[k] !== 0 && (i[j] !== i[k])) {
                            break;
                        }
                    }
                }
            }
        }
        usingContext.setMyScore(score);
        usingContext.setAddScore({ addsc: addingScore, addClass: "add-translate" });
        //making all the pair and adding them 0 4 0 2 --> 4 2 0 0(after executing of beneath code)
        for (let i of virtualArray) {
            let start = 0;
            for (let j = 0; j <= i.length - 1; j++) {
                if (i[j] !== 0) {
                    i[start] = i[j];
                    if (start !== j) {
                        i[j] = 0;
                    }
                    start++;
                }
            }
        }
        run = 1;
        usingContext.setStateArray(virtualArray)
        return;
    }
    if (testRef === null) {
        window.addEventListener("keyup", Keyfunc);
        swipeArea.addEventListener('swipeDown', downKeyPress);
        swipeArea.addEventListener('swipeUp', upKeyPress);
        swipeArea.addEventListener('swipeLeft', leftKeyPress);
        swipeArea.addEventListener('swipeRight', rightKeyPress);
    }
    // keys for the events
    function Keyfunc(e) {
        if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
            upKeyPress();
        }
        else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
            downKeyPress();
        }
        else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
            leftKeyPress();
        }
        else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
            rightKeyPress();
        }
    }

    useEffect(() => {
        virtualArray = [];
        [...virtualArray] = usingContext.stateArray;
        let virtualLength = virtualArray.length;
        let gameOver = 0;
        if (run === 1) {
            // adding the 2 after each time key is pressed
            let randomArray = [];
            for (let i = 0; i < virtualArray.length; i++) {
                for (let j = 0; j < virtualArray[i].length; j++) {
                    if (virtualArray[i][j] === 0) {
                        randomArray.push({ "row": i, "column": j });
                    }
                }
            }
            let randomNum = Math.floor(Math.random() * randomArray.length);
            run = 0;
            randomArray.length !== 0 ? virtualArray[randomArray[randomNum]["row"]][randomArray[randomNum]["column"]] = 2 : console.log();
            usingContext.setStateArray(virtualArray);
        }
        else {
            // Game Over code
            for (let i of virtualArray) {
                if (i.includes(0)) {
                    gameOver = 0;
                    break;
                }
                else {
                    gameOver = 1;
                }
            }
            if (gameOver === 1) {
                for (let i = 0; i < virtualLength; i++) {
                    for (let j = 0; j < virtualLength; j++) {
                        // checking element with the bottom element
                        if ((i + 1) < virtualLength) {
                            if (virtualArray[i][j] === virtualArray[i + 1][j]) {
                                removeListener = 1;
                                break;
                            }
                            else {
                                removeListener = 0;
                            }
                        }
                        // checking element with the right side element
                        if ((j + 1) < virtualLength) {
                            if (virtualArray[i][j] === virtualArray[i][j + 1]) {
                                removeListener = 1;
                                break;
                            }
                            else {
                                removeListener = 0;
                            }
                        }
                    }
                    if (removeListener === 1) {
                        break;
                    }
                }
            }
            if (removeListener === 0) {
                usingContext.setGameFinish({ display: "block" });
            }
        }
    }, [`${usingContext.stateArray}`]);

    return (
        <>
            {null}
        </>
    )
}
export default KeysCases;
