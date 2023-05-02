import React from 'react';

const ImageLinkForm=({onInputChange, onButtonSubmit, input})=>{
    return(
    <div>
        <p className="f3"> 
            This Magic Brain will detect faces in your pictures. Give it a try. 
        </p>
        <div>
            <input className="f4 pa2 w-70 center" type="text" onChange={onInputChange} value={input}/>
            <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onButtonSubmit}>Detect</button>
        </div>
        
    </div>
    );
}

export default ImageLinkForm; 