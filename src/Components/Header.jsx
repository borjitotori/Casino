import React from 'react';
import "./Styles.css";



const Header = props =>{
    if(props.user){
        return(
            <div className = "Header">
                 <div className = "CasinoName">Royale Bet</div>
                <div className = "NameDisplay">{props.user.name}</div>
                <div className = "BalanceDisplay">{props.user.balance}$</div>
                
            </div>
        );
    }else{
        return(
            <div className = "Header">
                <div className = "CasinoName">Royale Bet</div>
                <div className = "NameDisplay">Player</div>
                <div className = "BalanceDisplay">000000$</div>
            </div>
        );
    }
};

export { Header as default };