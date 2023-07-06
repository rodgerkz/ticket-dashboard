
import './App.css';
import React,{useEffect,useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './dashboard'

  const   App = () => {
    return (
<div>
        <BrowserRouter>
     
       <Routes>
       <Route exact path="/" element={<Dashboard/>} /> 
  
  <Route exact path="/not-found" element={<div style={{textAlign:'center'}}>
     
       
            <div style={{paddingTop:60}}>
    <h1>Page Not Found</h1><br/>
        
            </div>
            <div style={{paddingTop:60}}>


            </div>
            </div>}/>
              <Route path='*' element={<Dashboard/>} />
  
      </Routes>
    </BrowserRouter>
 
</div>

  

)
}
export default App;