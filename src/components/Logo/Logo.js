import React from 'react'; 
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo=()=>{
    return(
    <Tilt tiltEnable={true} tiltReverse={true} >
        <div className="tilt">
          <img src={brain} alt="logo"/>
          </div>
    </Tilt>
    );
}

export default Logo; 
