import React from 'react';
import { Container } from 'react-bootstrap';
import './ResultCard.css';

function ResultCard({ country, city, cityId, cost, FlightObj , cityData}) {

    const myStyle = {
        "background-image": "url('https://www.esky.eu/_fe/img/city_"+cityData.IataCode+"_horizontal_0.jpg')"
    }
    console.log(cityId)
    console.log(cityData)

    return (
        <div className="c-result-card">
            <div style={myStyle}>
                <p>{country}</p>
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