import React from 'react'
import "./../Styles/Blackjack.css";

const Card = (props) => {
    return(
        <div >
            <img className="card" src={props.src.image}/>
        </div>
    )
}

export default Card;