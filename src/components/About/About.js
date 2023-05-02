import React from 'react'; 
import './About.css';
const About=()=>{
    return(
        <div className='w-100 flex justify-center'>
        <div className='w-60'>
        <h1>The Magic Face Recongition App</h1>
        <h2>How to use</h2>
        <p>
            Welcome to the Magic Face Recongition App! Find a link of any image online and enter it into the searhbox. Click submit and watch as AI magic finds an identifies the face in your image!
        </p>
        <p>
            If you would like to keep a tracker of your submissions register to make an account. As this is one of my first full-stack projects, I would recommend using fake information. If you would like to see the feature without registering, try the fake account gmail test@gmail.com and password test. 
        </p>
        <p>
            Watch your score run up and compete against your friends!
        </p>
        </div>
        </div>
    );
}

export default About; 
