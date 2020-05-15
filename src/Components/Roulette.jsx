import React from 'react';
import { useState } from 'react';
import "./Styles/Roulette.css"
const Roulette = props =>{

    let rep =  0;
    const values = ["X2", "1/2", "BREAKDOWN", "JACKPOT", "NOTHING"," "];
    const [count, setCount] = useState(5);

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    const spin = () => {
        setCount(5);
        const tmp = Math.floor(Math.random()*10);
        if(tmp === 0 || tmp === 7){
            setCount(0);
            props.setBalance(props.getBalance() * 2)
        }else if(tmp ===1 || tmp===8){
            setCount(1);
            props.setBalance(props.getBalance() / 2)
        }else if(tmp===2 || tmp ===4 ||tmp===9){
            setCount(4);
        }else if(tmp === 3 || tmp === 6){
            setCount(2);
            props.setBalance(0)
        }else{
            setCount(3);
            props.setBalance(props.getBalance() * 5)
        }

    }

    return(
        <div className="RTgameContainer">
            <div className="RoulleteContainer">
                <img src={"https://raw.githubusercontent.com/DKbyo/react-native-roulette-casino-demo/master/images/wheel.png"} className="RoulleteIMG"/>
                <div className="RouletteText">
                        {values[count]}
                </div>                    
            </div>
            <button className="RouletteButton glow-rt" onClick={()=>spin()}>Spin</button>
        </div>
    );

    }

export { Roulette as default };