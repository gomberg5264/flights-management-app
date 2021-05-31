import React, { useEffect, useState } from 'react';
import './MyFlights.css';
import { Redirect } from "react-router-dom";
import { Col, Row } from 'react-bootstrap';

function MyFlights({ activeUser, cities }) {

    //when logout users will get out to the Home page
    if (!activeUser) {
        return <Redirect to="/" />
    }

    return (
        <div className="c-my-flights">
            <h1>My Flights:</h1>
            {

            }
        </div>
    );
}

export default MyFlights;