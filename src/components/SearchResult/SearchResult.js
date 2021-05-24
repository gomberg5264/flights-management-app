import React from 'react';
import { Col } from 'react-bootstrap';
import './SearchResult.css';

function SearchResult(props) {
    return (
        <div className="c-search-result">
            <img src="/" alt="img"/>
            <div className="search-data">
                <p>city</p>
                <p>country</p>
                <p>date</p>
                <p>cost</p>
            </div>
        </div>
            // <div className="c-result-card">
            //     <div style={myStyle}>
            //         <p>{country}</p>
            //         <div>
            //             <h4>{city}</h4>
            //             <h4>{cost} ₪</h4>
            //             <p>Choose the departure place</p>
            //         </div>
            //         <div className="dark-background"></div>
            //     </div>
            // </div>
    );
}

export default SearchResult;