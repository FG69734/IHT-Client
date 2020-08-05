import React from 'react';
import spinner from './spinner2.gif';

const SpinnerSearch = (props) => {

    return (
        <div className="w-100"> 
            <div className="d-flex w-100 h-100 justify-content-center align-items-center">
                <img style={{marginBottom: '100px', marginTop: '100px'}} src={spinner} />
            </div>
        </div>
    )

}

export default SpinnerSearch;