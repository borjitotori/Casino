import React from 'react';
import "./Styles.css";
import { useState } from 'react';
import SlotMachine from './SlotMachine';
import BlackJack from './blackjack/Blackjack'
import Roulette from "./Roulette"
const Menu = props =>{
    const [game,setGame] =useState("");
    
    if(game === ""){
    return(
        <div className = "Menu">
            <div className = "Games">
                <div className="Game">
                    <div className = "SM shine" onClick={()=>setGame("SM")}></div>
                </div>
                <div className="Game">
                    <div class = "BJ shine" onClick={()=>setGame("BJ")}></div>
                </div>
                <div className="Game" >
                    <div className = "R shine" onClick={()=>setGame("R")}></div>
                </div>

            
            </div>
            <button className = "ButtonLog Add" onClick={()=>props.addBalanceHandler()}>Add Founds</button>
            <button className = "ButtonLog Logout" onClick={()=>props.LogOutHandler()}>LogOut</button>

        </div>
    );
    }else if(game ==="SM"){
        return(
            <div className = "GameScreen">
                <button className = "ButtonLog back" onClick={()=>setGame("")}></button>
                <SlotMachine getBalance = {props.getBalance} setBalance={props.setBalance}></SlotMachine>
            </div>
        );
        
    }else if(game=="BJ"){
        return(
        <div className = "GameScreen">
            <button className = "ButtonLog back" onClick={()=>setGame("")}></button>
            <BlackJack getBalance = {props.getBalance} setBalance={props.setBalance}></BlackJack>
        </div>
        );
    }else if(game=="R"){
        return(
            <div className = "GameScreen">
                <button className = "ButtonLog back" onClick={()=>setGame("")}></button>
                <Roulette getBalance = {props.getBalance} setBalance={props.setBalance}></Roulette>
            </div>
        );
    }else{
        return(
            <div className = "GameScreen">
                <button className = "ButtonLog back" onClick={()=>setGame("")}></button>
                <div>Error</div>
            </div>

        );

    }


};

export { Menu as default };