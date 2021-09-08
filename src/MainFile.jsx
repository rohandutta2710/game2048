import React, { useEffect, useRef, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import KeysCases from "./KeysCases.jsx";
import settingArr from "./CustomHook.jsx";
import { gameContext } from "./ContextManager.jsx";
// const BackEndData=require('../BackendFiles/Backend');
function MainFile() {
    const usingContext = useContext(gameContext);
    const myRef = useRef(null);

    // //setting the highscore when the page is loaded
    // window.addEventListener("load", () => {
    //     let highSc;
    //     // highSc=BackEndData.InitialDataFunc();
    //     highSc = 0;
    //     usingContext.setBestScore(highSc);
    // });

    //New Game Function 
    async function NewGameFunc() {
        let r1=Math.floor(Math.random()*usingContext.stateArray.length);
        let c1=Math.floor(Math.random()*usingContext.stateArray.length);
        let r2=Math.floor(Math.random()*usingContext.stateArray.length);
        let c2=Math.floor(Math.random()*usingContext.stateArray.length);
        let p=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
        p[r1][c1]=2;
        p[r2][c2]=2;
        usingContext.setStateArray(p);
        usingContext.setMyScore(0);
        usingContext.setGameFinish({ display: "none" });

        // this should given in useEffect when the highscore is broken
        // if (usingContext.myscore === usingContext.bestScore && usingContext.myscore !== 0) {
        //     // BackEndData.StoreDataFunc(bestScore);
        // }
    }
    useEffect(() => {
        usingContext.setClassState("ref-animation");
        setTimeout(() => {
            usingContext.setClassState(null);
        }, 100);
        setTimeout(() => { usingContext.setAddScore({ addsc: 0, addClass: "add-timing" }) }, 600);
        settingArr(usingContext.myscore,usingContext.stateArray);
        //setting highscore if broken
        usingContext.bestScore < usingContext.myscore ? usingContext.setBestScore(usingContext.myscore) : console.log();
    }, [`${usingContext.stateArray}`])

    return (
        <>
            <KeysCases propref={myRef} />
            <div className="main-box" ref={myRef}>
                <div className="outer-box">
                    <div className="gaming-box">
                        <div className="game-heading">
                            <div>
                                <h1>2048</h1>
                            </div>
                            <div className="Score">
                                <div>
                                    <h4>Score</h4>
                                    <h4>{usingContext.myscore}</h4>
                                    <h5 className={usingContext.addScore.addClass}>{usingContext.addScore.addsc !== 0 ? "+".concat(usingContext.addScore.addsc) : null}</h5>
                                </div>
                                <div style={{ marginLeft: "10px", padding: "2px 19px 6px 19px" }}>
                                    <h4>Best</h4>
                                    <h4>{usingContext.bestScore}</h4>
                                </div>
                            </div>
                        </div>
                        <p>Join the number and get to <strong>2048 tile!</strong></p>

                        <div className="inner-box">
                            {usingContext.stateArray.map((val, ind) => {
                                return (
                                    val.map((data, index) => {
                                        return <div key={ind + "" + index}><button className={usingContext.classState} style={usingContext.bgColor[usingContext.stateArray[ind][index]]}>{data !== 0 ? data : ""}</button></div>
                                    }))
                            })}
                        </div>
                        {/* game over div */}
                        <div className="game-finish" style={usingContext.gameFinish}>
                            <div className="gameFinish-inner" >
                                <h1>Game Over</h1>
                            </div>
                        </div>
                    </div>
                    <div className="new-game">
                        <button onClick={NewGameFunc}>New Game</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainFile;
