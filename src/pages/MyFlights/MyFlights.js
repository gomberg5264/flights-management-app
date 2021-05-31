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
        query.equalTo("objectId", "nFFoExR9kg");
        query.find().then((results) => {
            for (const object of results) {
                const city = object.get("city")
                const cityId = object.get("cityId")
                const country = object.get("country")
                const departureDate = object.get("departureDate")
                const returnDate = object.get("returnDate")
                const sourcePlace = object.get("sourcePlace")
                const cost = object.get("cost")
                const direct = object.get("direct")
                const carriers = object.get("carriers")

                console.log('flightsData found:', city);
                console.log('flightsData found:', country);
                console.log('flightsData found:', departureDate);
                console.log('flightsData found:', returnDate);
                console.log('flightsData found:', sourcePlace);
                console.log('flightsData found:', cost);
                console.log('flightsData found:', direct);
                console.log('flightsData found:', carriers);

                myData.push(new FlightModel(city,cityId, country,
                     departureDate, returnDate, sourcePlace, cost, direct, carriers));
            }
        }, (error) => {
            console.error('Error while fetching flightsData', error);
        });
        setMyFlights(myData);
    }, []);

    console.log(myFlights)

    //when logout users will get out to the Home page
    if (!activeUser) {
        return <Redirect to="/" />
    }

    return (
        <div className="c-my-flights">
            <h1>My Flights:</h1>
            {
                myFlights ? myFlights.map( (flight, index) =>
                    <Row><SearchResult key={index}
                        country={flight[index].country}
                        city={flight[index].city}
                        originCity={flight[index].sourcePlace}
                        dates={[flight[index].departureDate,flight[index].returnDate]}
                        carrier={flight[index].carriers}
                        cost={flight[index].cost}
                        direct={flight[index].direct}
                        cityData={flight[index].cityId} /></Row>)
                : "Loading..."
            }
        </div>
    );
}

export default MyFlights;