import React, { useEffect, useState } from 'react';
import './MyFlights.css';
import { Redirect } from "react-router-dom";
import { Col, Row } from 'react-bootstrap';
import FlightModel from '../../model/FlightModel';
import Parse from 'parse';
import SearchResult from '../../components/SearchResult/SearchResult';


function MyFlights({ activeUser, cities }) {

    const [myFlights, setMyFlights] = useState(null);

    useEffect(() => {
        let myData = [];
        //reading data from parse
        const flightsData = Parse.Object.extend('flightsData');
        const query = new Parse.Query(flightsData);
        query.equalTo("userId", Parse.User.current());
        query.find().then((flightsResults) => {
            for (const flight of flightsResults) {
                myData.push(new FlightModel(flight));
            }
        }, (error) => {
            console.error('Error while fetching flightsData', error);
        });
        setMyFlights(myData);
    }, []);

    console.log("my flights",myFlights)

    //when logout users will get out to the Home page
    if (!activeUser) {
        return <Redirect to="/" />
    }

    // sometimes even the US needs 24-hour time
    const options = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        hour12: false,
        timeZone: 'Asia/Jerusalem' //'America/Los_Angeles'
    };

    return (
        <div className="c-my-flights">
            <h1>My Flights:</h1>
            {
                myFlights && myFlights.length > 0 ? myFlights.map((flight, index) =>
                    <Row><SearchResult key={index}
                        country={flight.country}
                        city={flight.city}
                        originCity={flight.sourcePlace}
                        dates={[new Intl.DateTimeFormat('default', options).format(flight.departureDate), new Intl.DateTimeFormat('default', options).format(flight.returnDate)]}
                        carrier={flight.carriers}
                        cost={flight.cost}
                        direct={flight.direct}
                        cityData={flight.cityId}
                        operation={"data"} /></Row>)
                    : "Loading..."
            }
        </div>
    );
}

export default MyFlights;