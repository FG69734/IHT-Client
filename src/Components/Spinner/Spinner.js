import React from 'react';
import spinner from './spinner.gif';

const Spinner = (props) => {
    return (
        <div className="w-100 h-100" style={{'position': 'fixed', 'top': '0', 'left': 0, 'zIndex': '5000', 'backgroundColor': 'white'}} > 
            <div className="d-flex w-100 h-100 justify-content-center align-items-center bg-gray" style={{'opacity': '.7'}} >
                <img width= '70px' height= '70px' src={spinner} />
            </div>
        </div>
    )
}

export default Spinner;