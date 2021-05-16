import React from 'react';
import './CustomHeader.css'

function CustomHeader({textLocation, title, text}) {

    const customStyle = {
        "justify-content": textLocation
    }

    return (
        <div>
            <div className="head-container" style={customStyle}>
                <div className="container">
                    <h1>{title}</h1>
                    <p>{text}</p>
                </div>
            </div>
        </div>
    );
}

export default CustomHeader;