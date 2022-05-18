import React from 'react';
import './App.css';
import {TextField, Button} from '@mui/material';
import { json } from 'stream/consumers';
import {
  Routes,
  Route,
} from "react-router-dom";


interface props{
  isDisable:boolean;
}

function App() {
  return( 
    <Routes>
      <Route path='/'element={<HomeComponent/>}/>
      <Route path='/details' element={ <DetailsComponent/>}/>
    </Routes>
      )
}

export default App;
const HomeComponent = () =>{
  const api_key='Wcfo9bsCYvZNaJSHhGxQTsRmPY3rNdsr0bmHsGWU';
  const [isDisable , setDisable]=React.useState(true);
  const[newValue, setnewValue]=React.useState('');
  const handleSubmit =(e:any)=>{
    e.preventDefault();
    fetch(`https://api.nasa.gov/neo/rest/v1/neo/${newValue}?api_key=${api_key}`)
    .then((data)=>data.json())
    .then((res)=>{localStorage.setItem("idvalue",JSON.stringify(res))
    return window.open('/details')})
    .catch((err)=>alert(err))
  }
  const handleRandomId=()=>{
    fetch(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${api_key}`)
    .then((data)=>data.json())
    .then((res)=>{
      let senddata=res?.near_earth_objects[Math.floor(Math.random()*20)];
      localStorage.setItem("idvalue",JSON.stringify(senddata))
      return window.open('/details')
    })
    // .catch((err)=>alert(err))
  }

  return (
    <div className='app'>
      <form action=' 'className='form' onSubmit={handleSubmit}>
<TextField placeholder='enter astroid id' className='textfield'  value={newValue} onChange={(e)=> setnewValue(e.target.value)}/>
<Button variant="contained" disabled={newValue?. length >0 ? false:true} type='submit' className='btn'>submit</Button>
<Button onClick={()=>handleRandomId()} className="randombtn">Random Asteroid</Button>
</form>
    </div>
  );
}
const DetailsComponent= () =>{

const[values, setValues]=React.useState<any>()
React.useEffect (() =>{
const data = localStorage.getItem('idvalue');
if(data){
   console.log(JSON.parse(data))
  setValues(JSON.parse(data));
}
},[])
  return (
    <div className='app'>
     {values?.name}
     {values?.is_potentially_hazardous_asteroid ? 'yes':'No' }
     {values?.nasa_jpl_url}
    </div>
  );
}