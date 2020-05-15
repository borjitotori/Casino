import React from 'react';
import { useState } from 'react';
import "./Styles/SlotMachine.css"


const SlotMachine = props =>{
    const RunningMSG = "RUNNING";
    const Remaining1MSG = "1 LEFT";
    const Remaining2MSG = "2 LEFT";
    const StopedMSG = "STOPPED";
    const delay = 100;

    const [bet,setBet] = useState(5);

    const [display,setDisplay] = useState([0,0,0])

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    const Running = () =>{
        let disp1;
        let disp2;
        let disp3 ;
        if(document.getElementById("StatusDisplay").innerHTML === RunningMSG){
            sleep(delay).then(() => {
                    disp1 = display[0]++;
                    disp2 = display[1]++;
                    disp3 = display[2]++;
                    setDisplay([disp1,disp2,disp3]);
                    Running();
                }      
              )
            }else if(document.getElementById("StatusDisplay").innerHTML === Remaining2MSG){
                sleep(delay).then(() => {
                    disp2 = display[1]++;
                    disp3 = display[2]++;
                    setDisplay([display[0],disp2,disp3]);
                    Running();
                }      
              )
    
            }else if(document.getElementById("StatusDisplay").innerHTML === Remaining1MSG){
                sleep(delay).then(() => {
                    disp3 = display[2]++;
                    setDisplay([display[0],display[1],disp3]);
                    Running();
                }      
              )
            }else if(document.getElementById("StatusDisplay").innerHTML == StopedMSG){
                //end game
                sleep(delay).then(() => {
                    setDisplay([display[0],display[1],display[2]]);

                    if(checkWin() === 1){
                        const newBalance = parseInt( props.getBalance()) + bet * 4;
                        props.setBalance(newBalance.toString());
                    }
                });
            }
    }

    const checkWin = () =>{
        if((display[0]%5) === (display[1]%5) && (display[0]%5) === (display[2]%5)){
            return(1);
        }else{
            return(0);
        }
    }

    const goHandler = () =>{
        if(props.getBalance() >= bet){
            if(document.getElementById("StatusDisplay").innerHTML === StopedMSG){
                const newBalance = parseInt( props.getBalance()) - bet ;
                props.setBalance(newBalance.toString());
                document.getElementById("StatusDisplay").innerHTML = RunningMSG;
                Running();
            }
        }


    }

    const stopHandler =()=>{
        if(document.getElementById("StatusDisplay").innerHTML === RunningMSG){
            document.getElementById("StatusDisplay").innerHTML = Remaining2MSG;
        }else if(document.getElementById("StatusDisplay").innerHTML === Remaining2MSG){
            document.getElementById("StatusDisplay").innerHTML = Remaining1MSG;
        } else if(document.getElementById("StatusDisplay").innerHTML === Remaining1MSG){
            document.getElementById("StatusDisplay").innerHTML = StopedMSG;
        }
    }

    const upHandler = () =>{
        if(document.getElementById("StatusDisplay").innerHTML == StopedMSG){
            if(bet + 5 <= props.getBalance()){
                setBet(bet + 5);
            }else{
                setBet(props.getBalance());
            }
        }
    }

    const downHandler = ()=>{
        if(document.getElementById("StatusDisplay").innerHTML == StopedMSG){
            if(bet - 5 < props.getBalance() && bet >= 5){
                setBet(bet - 5);
            }else{
                setBet(0);
            }
        }
    }

    return(
        <div className = "SlotMachine">
            <div className = "StatusDisplay" id="StatusDisplay">{StopedMSG}</div>
            <div className ="SlotMachineDisplay">
                <div className="SlotItem">{display[0]%5}</div>
                <div className="SlotItem">{display[1]%5}</div>
                <div className="SlotItem">{display[2]%5}</div>

            </div>
            <div className ="SlotButtons">
                <button className = "SlotButton SlotStop glow-on-hover" onClick={()=>stopHandler()}>STOP</button>
                <div className = "SlotButton SlotBet" onClick={()=>downHandler()}>🡇</div>
                <div className ="SlotBetDisplay">
                    <div>{bet}$</div>    
                </div>
                <div className = "SlotButton SlotBet" onClick={()=>upHandler()}>🡅</div>
                <button className = "SlotButton SlotGo glow-on-hover" onClick={()=>goHandler()}>LET'S GO</button>
            </div>


        </div>
    );
    
};

export { SlotMachine as default };