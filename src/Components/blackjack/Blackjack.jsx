import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Dealer from './Dealer'
import Player from './Player'
import "./../Styles/Blackjack.css";
    
const Blackjack = (props) =>{


    const endpoint = "https://deckofcardsapi.com/api/deck/"
    const [balance, setBalance] = useState(50);
    const [deck, setDeck] = useState(null);
    const [cardsP, setCardsP] = useState(null);
    const [valueP, setValueP] = useState(null);
    const [cardsD, setCardsD] = useState(null);
    const [valueD, setValueD] = useState(null);
    const [status, setStatus] = useState(null);
    const [softTokenD, setSoftTokenD] = useState(0);
    const [softTokenP, setSoftTokenP] = useState(0); 
    const [foldFalg, setFoldFlag] = useState(1);
    const [remaining, setRemaining] = useState(null);
    const [bet, setBet] = useState(0);

    const drawCard = type => {
        axios.get(`${endpoint}${deck.deck_id}/draw/?count=1`)
        .then(response => {
            if(type===1){
            if(cardsP===null){
                setCardsP(response.data.cards);
            }else{
                if(valueP<21){
                    let hand = cardsP;
                    hand.push(response.data.cards[0]);
                    setCardsP(hand);
                }
            }
            }else{ 
            if(cardsD===null){
                setCardsD(response.data.cards);
            }else{
                let hand = cardsD;
                hand.push(response.data.cards[0]);
                setCardsD(hand);
            }
            }
            setRemaining(remaining-1);
            check();
        })
    }

    //CHANGE UPON DEPLOY
    const getBalance = () => {
        return parseInt(props.getBalance()) ;
    }

    const upHandler = () => {
        if(cardsD===null && cardsP===null){
        if(bet + 5 <= getBalance()){
            setBet(bet + 5)
        }else{
            setBet(getBalance());
        }
        }
    }

    const downHandler = () => {
        if(cardsD===null && cardsP===null){
        if(bet - 5 <= getBalance() && bet >= 5){
            setBet(bet - 5)
        }else{
            setBet(0);
        }
        }
    }

    const check = () => {
        let tmpD = [];
        let tmpP = [];
        let dValue = 0;
        let pValue = 0;
        if(cardsD){
        cardsD.map(card=>{
            tmpD.push(card.value);
        })
        tmpD.map(val=>{
            if(val==="ACE"){
            dValue += 11;
            }else if(val==="QUEEN" || val==="JACK" || val==="KING" || val==="0"){
            dValue += 10
            }else{
            dValue += Number(val);
            }
        })
        }
        if(cardsP){
        cardsP.map(card=>{
            tmpP.push(card.value);
        })
        tmpP.map(val=>{
            if(val==="ACE"){
            pValue += 11;
            }else if(val==="QUEEN" || val==="JACK" || val==="KING" || val==="0"){
            pValue += 10
            }else{
            pValue += Number(val);
            }
        })
        }
        setValueD(dValue);
        setValueP(pValue);
        softChecker();
    }

    const dealergame = () => {
        if(valueD<17 && valueP<22){
            if(valueP === 21 && cardsP.length == 2){
                win_lose_check();
                setFoldFlag(1);
            }else{
                drawCard(0);
            }
        }else{
            win_lose_check();
            setFoldFlag(1);
            setBet(0);
        }
    }

    const softChecker = () => {
        if(valueD>21){
            cardsD.map(card=>{
                if(card.value === "ACE"){
                    if(softTokenD===0){
                        setValueD(valueD-10);
                        setSoftTokenD(1);
                    }
                }
            })
        }
        if(valueP>21){
        cardsP.map(card=>{
            if(card.value === "ACE"){
                if(softTokenP===0){
                    setValueP(valueP-10);
                    setSoftTokenP(1);
                }
            }
        })
        }
        console.log(valueD)
        console.log(valueP)
    }

    const startGame = () => {
        if(!cardsP || !cardsD){
        setStatus(null);
        axios.get(`${endpoint}${deck.deck_id}/draw/?count=2`)
            .then(response => {
            setCardsP(response.data.cards);
            })
        
            axios.get(`${endpoint}${deck.deck_id}/draw/?count=1`)
            .then(response => {
            setCardsD(response.data.cards);
            })
        setBalance(getBalance()-bet);
        props.setBalance((getBalance()-bet).toString());
        }
        setRemaining(remaining-3);
    }

    const win_lose_check = () => {
        if(valueP>21 && valueD>21){
        console.log('YOU BOTH SUCKS')
        }else if(valueP>valueD){
        if(valueP>21){
            console.log('YOU LOSE')
            setStatus("YOU LOSE")
        }else{
            console.log('YOU WIN')
            setStatus("YOU WIN")
            props.setBalance((getBalance()+ bet*2).toString());
            setBalance(getBalance()+ bet*2)
        }
        }else if(valueD>21 && valueP<21){
        console.log('YOU WIN')
        setStatus("YOU WIN")
        props.setBalance((getBalance()+ bet*2).toString());
        setBalance(getBalance()+ bet*2)
        }else if(valueD === valueP){
            console.log("IT'S A TIE")
            setStatus("IT'S A TIE")
            props.setBalance((getBalance()+ bet).toString());
            setBalance(getBalance()+ bet)
        }else{
        console.log('YOU LOSE')
        setStatus("YOU LOSE")
        }
        setValueD(null);
        setValueP(null);
        setCardsD(null);
        setCardsP(null);
        if(remaining <= 26){
            gen_deck();
        }
    }

    const gen_deck = () => {
        axios.get(`${endpoint}new/shuffle/?deck_count=1`)
        .then(response => {
            setDeck(response.data);
            setRemaining(response.data.remaining);
        })
        console.log("GENERATING DECK")
    }

    const log = () => {
        console.log(deck);
        console.log(cardsP);
        console.log(cardsD);
        console.log(valueP);
        console.log(valueD);
    }

    if(deck===null){
        return (
        <div className="Button" onClick={gen_deck()}>
            GENERATING NEW DECK
        </div>
        );
    }else{
        return(
        <div>
        <div className="login-page">
            <div className="form">
                {bet===0?
                    <p>
                        YOU MUST BET IN ORDER TO PLAY
                    </p>
                    :
                    <button onClick={()=>startGame()}>
                        ROUND START
                    </button>
                }
                <p type="text" >ACTUAL BET: {bet}$</p>
                <div className="betContainer">
                    <button  className="bet" onClick={() => upHandler()}>
                        ▲
                    </button>
                    <button className="bet" onClick={()=>downHandler()}>
                        ▼
                    </button>
                </div>
            </div>
            <Dealer drawCard={drawCard} cardsD={cardsD}/>
            {cardsP!==null && cardsD!==null?  
            <div className="control">       
                <div  onClick={()=>dealergame()}>
                {foldFalg === 1 ? 
                    <div>
                        <button onClick={()=>setFoldFlag(0)}>FOLD</button>

                    </div>
                    : 
                    <button>OK</button>}
                </div>
                {foldFalg === 1 ?
                    <button onClick={()=>drawCard(1)}>DRAW</button> 
                    :
                    null
                }
                <div className="cooltext">
                    <p>
                        DEALER WILL STOP AT 17 OR HIGHER
                    </p>
                    <p>
                        ACES ARE ALWAYS 11
                    </p>
                </div>
            </div>
            : null}
            <Player drawCard={drawCard} cardsP={cardsP}/>
        </div>
        </div>
        )
    }
}

export default Blackjack;