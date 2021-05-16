import React from 'react';
import { Container } from 'react-bootstrap';
import './ResultCard.css';

function ResultCard({ country, city, cost, FlightObj }) {


    return (
        <div className="c-result-card">
            <div>
                
                <p>{country}</p>
                <div>
                    <h4>{city}</h4>
                    <h4>{cost} ₪</h4>
                    <p>Choose the departure place</p>
                </div>
            </div>
        </div>
    );
}

export default ResultCard;