import axios from 'axios';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import CustomCarousel from '../../components/CustomCarousel/CustomCarousel';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import ResultCard from '../../components/ResultCard/ResultCard';
import './DealsPage.css';
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
            mapCarriers.set(carrier["CarrierId"], carrier);
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
            mapCarriersMonth.set(carrier["CarrierId"], carrier);
        });
        //reset 
        filterPlaces = [];
        //filter Month Quotes
        filteredMonthQ = month["Quotes"].filter((deal, index) => filterByDestinationId(deal, index));

        console.log("original json", deals);
        console.log("filter json", filteredDealsQ);
        console.log("filter month json", filteredMonthQ);
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
                            filteredDealsQ.map((deal, index) => <Col md={6} lg={4}><ResultCard key={index} country={mapPlaces.get(deal["OutboundLeg"]["DestinationId"]).CountryName}
                                city={mapPlaces.get(deal["OutboundLeg"]["DestinationId"]).CityName} cityId={mapPlaces.get(deal["OutboundLeg"]["DestinationId"]).CityId} //.substring(0, 3)//
                                cost={deal["MinPrice"]} FlightObj={deal} cityData={citiesList.get(mapPlaces.get(deal["OutboundLeg"]["DestinationId"]).CityName)} /></Col>)
                            : <p>loading...</p>
                    }
                </Row>
                <h2>The month's best deals</h2>
                <Row>
                    {
                        filteredMonthQ && citiesList ?
                            filteredMonthQ.map((deal, index) => <Col md={6} lg={4}><ResultCard key={index} country={mapPlacesMonth.get(deal["OutboundLeg"]["DestinationId"]).CountryName}
                                city={mapPlacesMonth.get(deal["OutboundLeg"]["DestinationId"]).CityName} cityId={mapPlacesMonth.get(deal["OutboundLeg"]["DestinationId"]).CityId} //.substring(0, 3)//
                                cost={deal["MinPrice"]} FlightObj={deal} cityData={citiesList.get(mapPlacesMonth.get(deal["OutboundLeg"]["DestinationId"]).CityName)} /></Col>)
                            : <p>loading...</p>
                    }
                </Row>
                
            </div>
        </div>
    );
}

export default DealsPage;