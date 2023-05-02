import React from 'react'; 
import './Logo.css';
import brain from './brain.png';

const Logo=({onRouteChange})=>{
    return(
        <div className="w-100 flex justify-center mb4">
        <a href='#0' className='black pointer dim' 
        onClick={() => {
            onRouteChange('about')}}>
        <div className="flex justify-center">
            <img src={brain} alt="logo"/>
          
          <div>
          <h1 >FaceRec <br></br> App </h1>
          </div>
          </div>
          </a>
        </div>
    );
}

export default Logo; 
