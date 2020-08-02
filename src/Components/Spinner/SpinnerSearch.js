import React from 'react';
import spinner from './spinner.gif';

const SpinnerSearch = (props) => {
    return (
        <div className="w-100 h-100" style={{'position': 'fixed', 'top': '0', 'left': 0}} > 
            <div className="d-flex w-100 h-100 justify-content-center align-items-center bg-gray" style={{'opacity': '.7'}} >
                <img width= '80px' height= '80px' src={spinner} />
            </div>
        </div>
    )
}

export default SpinnerSearch; 