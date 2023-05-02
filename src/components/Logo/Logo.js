import React from 'react'; 
import './Logo.css';
import brain from './brain.png';

const Logo=()=>{
    return(
        <div className="w-100 flex justify-center mb4">
        <button type='submit'>
        <div className="flex justify-center">
            <img src={brain} alt="logo"/>
          
          <div>
          <h1>FaceRec</h1>
          <h1>App</h1>
          </div>
          </div>
          </button>
        </div>
    );
}

export default Logo; 
