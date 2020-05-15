import React from 'react';
import "./Styles.css";
import { useState } from 'react';



const Login = props =>{
    const [username,setUsername]=useState();
    const [password,setPassword]=useState();
    return(
        <div className = "Login">
            <div>
                <div>
                    <input className = "input" type="text" placeholder="Username" onChange={(event)=> setUsername(event.target.value) }/>
                </div>
                <div>
                    <input className = "input" type="text" placeholder="Password" onChange={(event)=> setPassword(event.target.value)}/>
                </div>
                <div className = "ButtonBox">
                    <button className = "ButtonLog" onClick={()=>props.LogInHandler(username,password)}>LogIn</button>
                </div>
                   
                <div>
                    <p className="message">Not registered? <a href="#" onClick={()=>props.RegisterHandler(username,password)}>Create an account</a></p>
                </div>
            </div>
        </div>
    );
    
};

export { Login as default };