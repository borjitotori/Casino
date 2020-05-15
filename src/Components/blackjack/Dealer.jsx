import React from 'react'
import Card from './Card'
import BackCard from './Backcard'
import "./../Styles/Blackjack.css";

const Dealer = (props) => {
    return(
        <div className="Dealer">
            {props.cardsD!==null ? 
                props.cardsD.map(result=>{
                    if(props.cardsD.length !== 1){
                        return( <Card key={result.code} src={result}/>)
                    }else{
                        return(
                            <div>
                                <Card key={result.code} src={result}/>
                                <BackCard/>
                            </div>
                        )
                    }
                })                   
                :
                null
            }
        </div>
    )
}

export default Dealer;