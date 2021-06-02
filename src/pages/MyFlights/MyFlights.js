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
            setMyFlights(myData);
        }, (error) => {
            console.error('Error while fetching flightsData', error);
        });
    }, []);

    console.log("my flights", myFlights)

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


    function handleSave(e) {
        console.log(e.currentTarget.getAttribute('id'))
        console.log(e.currentTarget.getAttribute('data-myattr'))
        let save = e.currentTarget.getAttribute('id');

        let flightdata = myFlights[e.currentTarget.getAttribute('data-myattr')];
        console.log("my flight data DATA", flightdata);
        if (save == false) {

            //save the data at Parse
            const flightsData = Parse.Object.extend('flightsData');
            const myNewObject = new flightsData();

            myNewObject.set('city', flightdata.city);
            myNewObject.set('cityId', flightdata.cityId);
            myNewObject.set('country', flightdata.country);
            myNewObject.set('departureDate', new Date(new Intl.DateTimeFormat('default', options).format(flightdata.departureDate)));
            myNewObject.set('returnDate', new Date(new Intl.DateTimeFormat('default', options).format(flightdata.returnDate)));
            myNewObject.set('sourcePlace', flightdata.sourcePlace);
            myNewObject.set('cost', flightdata.cost);
            myNewObject.set('direct', flightdata.direct);
            myNewObject.set('carriers', flightdata.carriers);
            myNewObject.set('userId', Parse.User.current());

            myNewObject.save().then(
                (result) => {
                    console.log('new flightsData saved!', result);
                },
                (error) => {
                    console.error('Error while creating flightsData: ', error);
                }
            );

            //change the save state (and the icon)
        } else {

            const objectId = flightdata.id;

            (async () => {
                const query = new Parse.Query('flightsData');
                try {
                    // here you put the objectId that you want to delete
                    const object = await query.get(objectId);
                    try {
                        const response = await object.destroy();
                        console.log('Deleted ParseObject', response);
                        setMyFlights([].concat(myFlights.splice(e.currentTarget.getAttribute('data-myattr'), 1)))
                    } catch (error) {
                        console.error('Error while deleting ParseObject', error);
                    }
                } catch (error) {
                    console.error('Error while retrieving ParseObject', error);
                }
            })();
        }
    }

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
                        Save={true}
                        onSave={handleSave}
                        index={index} /></Row>)
                    : "Loading..."
            }
        </div>
    );
}

export default MyFlights;