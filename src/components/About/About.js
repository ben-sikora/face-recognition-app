import React from 'react'; 
import './About.css';
const About=()=>{
    return(
        <div className='w-100 flex justify-center'>
        <div className='w-60'>
        <h1>The Magic Face Recongition App</h1>
        <h2>How to use</h2>
        <p>
            To get started using the Magic Face Recongition App first register! Enter an email, name, and passowrd to get started. As this is one of my first full-stack projects, I would recommend using fake information.
        </p>
        <p>
            Find a link of any image online and enter it into the searhbox. Click submit and watch as AI magic finds an identifies the face in your image!
        </p>
        <p>
            Watch your score run up and compete against your friends!
        </p>
        </div>
        </div>
    );
}

export default About; 
