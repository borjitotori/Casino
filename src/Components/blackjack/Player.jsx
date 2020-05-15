import React from 'react'
import Card from './Card'
import "./../Styles/Blackjack.css";

const Player = (props) => {
    return(
        <div className="Player">
            {props.cardsP!==null ? props.cardsP.map(result=>{
                return( <Card key={result.code} src={result}/>)}):
                null
            }
        </div>
    )
}

export default Player;