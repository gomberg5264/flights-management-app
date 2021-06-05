import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import './ResultCard.css';

function ResultCard({ index, country, city, cityId, cost, FlightObj, cityData , Save, onSave, type}) {
    const [save, setSave] = useState(Save);

    const myStyle = {
        "background-image": "url('https://www.esky.eu/_fe/img/city_" + cityData.IataCode + "_horizontal_0.jpg')"
    }
    // console.log(cityId)
    // console.log(cityData)

    function onSaveClicked(event) {
        onSave(event);
        setSave(!save);
    }

    return (
        <div className="c-result-card">
            <div style={myStyle}>
                <div className="handle-save">
                    <p>{country}</p>
                    <div id={save ? "1" : "0"} onClick={onSaveClicked} name={type} data-myattr={index}>
                        {save ? <span>&#9829;</span> : <span>&#9825;</span>}
                    </div>
                </div>
                <div>
                    <h4>{city}</h4>
                    <h4>{cost} ₪</h4>
                    <p>Choose the departure place</p>
                </div>
                <div className="dark-background"></div>
            </div>
        </div>
    );
}

export default ResultCard;