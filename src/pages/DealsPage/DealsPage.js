import axios from 'axios';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import CustomCarousel from '../../components/CustomCarousel/CustomCarousel';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import ResultCard from '../../components/ResultCard/ResultCard';
import './DealsPage.css';
import Parse from 'parse';
import Img from '../../assets/deals.jpg';


function DealsPage({ activeUser, deals, month, citiesList }) {
    //when logout users will get out to the Home page
    if (!activeUser) {
        return <Redirect to="/" />
    }

    let filterPlaces = [];
    function filterByDestinationId(item, index) {
        if (filterPlaces.includes(item.OutboundLeg.DestinationId) || filterPlaces.length > 11) {
            return false;
        } else {
            filterPlaces.push(item.OutboundLeg.DestinationId);
            console.log("INDEX", index);
            return true;
        }
    }


    let filteredDealsQ;
    let mapPlaces = new Map();
    let mapCarriers = new Map();
    let filteredMonthQ;
    let mapPlacesMonth = new Map();
    let mapCarriersMonth = new Map();
    if (deals && month) {
        //create mapPlaces HashMap
        deals["Places"].forEach(place => {
            mapPlaces.set(place["PlaceId"], place);
        });
        console.log("map place", mapPlaces);
        console.log("Place", mapPlaces.get(1228).Name);
        //create mapCarriers HashMap
        deals["Carriers"].forEach(carrier => {
            mapCarriers.set(carrier["CarrierId"], carrier["Name"]);
        });

        console.log("map Carriers", mapCarriers);
        //filter Quotes
        filteredDealsQ = deals["Quotes"].filter((deal, index) => filterByDestinationId(deal, index));


        //create mapPlacesMonth HashMap
        month["Places"].forEach(place => {
            mapPlacesMonth.set(place["PlaceId"], place);
        });
        console.log("map place month", mapPlacesMonth);
        //create mapCarriersMonth HashMap
        month["Carriers"].forEach(carrier => {
            mapCarriersMonth.set(carrier["CarrierId"], carrier["Name"]);
        });
        //reset 
        filterPlaces = [];
        //filter Month Quotes
        filteredMonthQ = month["Quotes"].filter((deal, index) => filterByDestinationId(deal, index));

        console.log("original json", deals);
        console.log("filter json", filteredDealsQ);
        console.log("filter month json", filteredMonthQ);
    }


    //the Flight id - so if i want to remove the Heart, the flight will be deleted from parse - it's only works until user search new flights
    let saveFlightId = new Map();

    function handleSave(e) {
        let save = e.currentTarget.getAttribute('id');
        let flightIndex = e.currentTarget.getAttribute('data-myattr');
        let flightType = e.currentTarget.getAttribute('name');
        console.log(flightType);
        if (save == false) {
            let flightData = flightType==="regular"? filteredDealsQ[flightIndex]: filteredMonthQ[flightIndex]; // need to check if monthly or regular
            //save the data at Parse
            const flightsData = Parse.Object.extend('flightsData');
            const myNewObject = new flightsData();
            console.log("THIS IS TEMP TEST", flightData);
            console.log("THIS IS TEMP TEST", flightIndex);
            myNewObject.set('city', mapPlaces.get(flightData["OutboundLeg"]["DestinationId"]).CityName);
            myNewObject.set('cityId', citiesList.get(mapPlaces.get(flightData["OutboundLeg"]["DestinationId"]).CityName).IataCode);
            myNewObject.set('country', mapPlaces.get(flightData["OutboundLeg"]["DestinationId"]).CountryName);
            myNewObject.set('departureDate', new Date(flightData["OutboundLeg"]["DepartureDate"]));
            myNewObject.set('returnDate', new Date(flightData["InboundLeg"]["DepartureDate"]));
            myNewObject.set('sourcePlace', deals["Places"][0].CityName ? deals["Places"][0].CityName : deals["Places"][0].Name);
            myNewObject.set('cost', flightData["MinPrice"]);
            myNewObject.set('direct', flightData["Direct"]);
            myNewObject.set('carriers', [mapCarriers.get(flightData["OutboundLeg"]["CarrierIds"][0]), mapCarriers.get(flightData["InboundLeg"]["CarrierIds"][0])]);
            myNewObject.set('userId', Parse.User.current());

            myNewObject.save().then(
                (result) => {
                    console.log('new flightsData saved!', result);
                    //change the save state (and the icon)
                    saveFlightId.set(flightIndex, result.id);
                },
                (error) => {
                    console.error('Error while creating flightsData: ', error);
                }
            );
        } else {
            //delete the data that saved
            const objectId = saveFlightId.get(flightIndex);
            (async () => {
                const query = new Parse.Query('flightsData');
                try {
                    // here you put the objectId that you want to delete
                    const object = await query.get(objectId);
                    try {
                        const response = await object.destroy();
                        console.log('Deleted ParseObject', response);
                    } catch (error) {
                        console.error('Error while deleting ParseObject', error);
                    }
                } catch (error) {
                    console.error('Error while retrieving ParseObject', error);
                }
            })();
        }
    }

    //pictures of cities!!! important
    //https://www.esky.eu/_fe/img/city_GLA_horizontal_0.jpg
    //https://static1.eskypartners.com/deals/MAD_1_SquareSmall_290_290.jpg

    return (
        <div className="p-deals">
            <CustomHeader img={Img} textLocation="flex-start" title="Plan and grab the best deals" text="See where you can travel to right now and find the best deals across thousands of flights" />
            {/* <CustomCarousel /> */}
            <div className="custom-container">
                <h2>The best deals</h2>
                <Row>
                    {
                        filteredDealsQ && citiesList ?
                            filteredDealsQ.map((deal, index) => <Col md={6} lg={4}><ResultCard key={index} index={index} country={mapPlaces.get(deal["OutboundLeg"]["DestinationId"]).CountryName}
                                city={mapPlaces.get(deal["OutboundLeg"]["DestinationId"]).CityName} cityId={mapPlaces.get(deal["OutboundLeg"]["DestinationId"]).CityId} //.substring(0, 3)//
                                cost={deal["MinPrice"]} FlightObj={deal} cityData={citiesList.get(mapPlaces.get(deal["OutboundLeg"]["DestinationId"]).CityName)}
                                onSave={handleSave} save={false} type="regular" /></Col>)
                            : <p>loading...</p>
                    }
                </Row>
                <h2>The month's best deals</h2>
                <Row>
                    {
                        filteredMonthQ && citiesList ?
                            filteredMonthQ.map((deal, index) => <Col md={6} lg={4}><ResultCard key={index} index={index} country={mapPlacesMonth.get(deal["OutboundLeg"]["DestinationId"]).CountryName}
                                city={mapPlacesMonth.get(deal["OutboundLeg"]["DestinationId"]).CityName} cityId={mapPlacesMonth.get(deal["OutboundLeg"]["DestinationId"]).CityId} //.substring(0, 3)//
                                cost={deal["MinPrice"]} FlightObj={deal} cityData={citiesList.get(mapPlacesMonth.get(deal["OutboundLeg"]["DestinationId"]).CityName)}
                                onSave={handleSave} save={false} type="monthly" /></Col>)
                                : <p>loading...</p>
                    }
                </Row>

            </div>
        </div>
    );
}

export default DealsPage;