import React, { useState } from 'react';
import './App.css';

import SlotMachine from './Components/SlotMachine';
import Header from './Components/Header';
import Login from './Components/Login';
import Menu from './Components/Menu'
function App() {

  const [usersData,setUsersData] = useState([]);
  const [token,setToken] = useState("");
  const [currentUser,setCurrentUser] = useState(undefined);
  
  
  const LogInHandler = (Username,Password) =>{
    if(Username !== undefined && Password !== undefined){
      const user = usersData.find(elememt => elememt.name === Username );
      if(user!==undefined){
        if(user.password === Password){
          //TODO generate random token
          setToken("random token");
          user.token = "random token";
          setCurrentUser(user);
        }else{
          console.log("password incorrect");
          alert("password incorrect");
        }
      }else{
        console.log("user does not exits");
        alert("user does not exits");
      }
    }else{
      console.log("invalid input");
      alert("invalid input");
    }
  }  

  const RegisterHandler = (Username,Password) =>{
  //TODO
    //check data validity
    if(Username !== undefined && Password !== undefined){
          //not the same twice
          if(usersData.find(elememt => elememt.name === Username ) === undefined){
            const data = usersData;
            const newData = [...data,{name:Username,password:Password,balance:"50",token:""}];
            setUsersData(newData);
            alert("New User "+Username +" Created")
          }else{
            console.log("Username Alredy taken")
            alert("Username Alredy taken");
          }
    }else{
      console.log("invalid input")
      alert("invalid input");
    }
  }  
  
  const LogOutHandler = ()=>{
    setToken("");
    const user = usersData.find(elememt => elememt.token === token );
    user.token = "";
    setCurrentUser();
  }

  const setBalance =(balance)=>{
    //TO-DO some securty stuff negatives and stuff
    if(currentUser){
      const user = usersData.find(elememt => elememt.token === token );
      user.balance = balance;
      setCurrentUser({...user});
      
    }
  }

  const addBalanceHandler = () =>{
    alert("This will set your balance to a flat 50$");
    setBalance("50");
  }


  const getBalance = () =>{
    if(currentUser){
      return (currentUser.balance);
    }else{
      return("-1");
    }
  }

  if(currentUser){
    return (
      <div className="App">
        <Header user={currentUser}/>
        <Menu LogOutHandler = {LogOutHandler} setBalance={setBalance} getBalance={getBalance} addBalanceHandler={addBalanceHandler}/>
        <iframe className="Video" width="560" height="315" src="https://www.youtube-nocookie.com/embed/9wh8FgsEtNQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    );
  }else{    
    return (
      <div className="App">
        <Header />
        <Login LogInHandler={LogInHandler} RegisterHandler={RegisterHandler}/>
      </div>
    );
  }
}

export default App;