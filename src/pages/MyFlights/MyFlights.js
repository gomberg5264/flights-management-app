import React, { useState } from 'react';
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
            MyFlights

        </div>
    );
}

export default MyFlights;