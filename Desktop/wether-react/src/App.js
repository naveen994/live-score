import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar';
import Mycard from './Components/MyCard';
import { Button, Grid } from '@material-ui/core';
import {getMatch} from './API/Api'
import { Fragment, useEffect, useState } from 'react';
import firebase from './FireBase/fireBase'

//615QO85HTuU001vnZZG37W9cQK32
// https://cricapi.com/api/matches/
function App() {
  const [matches,setMatches]= useState([])
  useEffect(()=>{
    {getMatch()
      .then((data)=>{
        setMatches(data.matches)
        console.log(data.matches);
      })
      .catch((error)=>alert('could notload data'))
 }
  },[])
  const create=()=>{
    firebase.write(null,{name:"Ajay",Phn:9900184118},"/users/")
    .then(data=>{console.log(data)})
    .catch(error=>{console.log(error)})
  }
  const getAll=()=>{
    firebase.getAll("/users/")
    .then(data=>{console.log(data)})
    .catch(error=>{console.log(error)})
  }
  return (
    <div className="App">
      <button onClick ={()=>create()}>Click Me</button>
      <button onClick ={()=>getAll()}>Get All</button>
     <NavBar/>
     <h1>Welcome Live score App</h1>
     <Button variant="contained" color="primary">Click Here</Button>
     <Grid container>  
       <Grid sm="2">

       </Grid>
       <Grid sm="8"> 
       {
       matches.map((match)=>(
         
         <Fragment>
           {
             match.type==="" ? (<Mycard key={match.unique_id} match={match}/>) :("")
           }
         </Fragment>
       ))
     }
       </Grid>
     </Grid>
    </div>
  );
}

export default App;
