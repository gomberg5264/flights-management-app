import React, { useState } from 'react';
import './SearchFlight.css';
import { Button, Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import Img from '../../assets/search1.jpg';
import SearchResult from '../../components/SearchResult/SearchResult';
import Parse from 'parse';


function SearchFlight({ cities }) {

  const [myPlace, setMyPlace] = useState("il");
  const [destination, setDestination] = useState("us");
  const [outBoundDate, setOutBoundDate] = useState("");
  const [inBoundDate, setInBoundDate] = useState("2021-06");
  const [direct, setDirect] = useState(false);
  const [flightsResults, setFlightsResults] = useState(null);

  //initial outBoundDate
  if (outBoundDate === "") {
    var today = new Date();
    let day = today.getDate();
    let month = (today.getMonth() + 1);
    let year = today.getFullYear();
    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }
    console.log(year + "-" + month + "-" + day)
    setOutBoundDate(year + "-" + month + "-" + day);
  }


  function callQuary() {
    const test = {
      method: 'GET',
      url: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0' +
        '/il/ils/il/' + myPlace + '/' + destination + '/' + outBoundDate + '/' + inBoundDate,
      //{country}/{currency}/{locale}/{originPlace}/{destinationPlace}/{outboundPartialDate}/{inboundPartialDate}
      // market_c/ V / ISO local/ see places/ see places / see places / yyyy-mm-dd  / (optional) yyyy-mm-dd (empty string for oneway trip.)

      headers: {
        'x-rapidapi-key': 'cdc00ae67amsh7ae44a7423a7a49p12b1aejsn6bd7ce98384d',
        'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com'
      }
    };

    axios.request(test).then(function (response) {
      console.log("test", response.data);
      setFlightsResults(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }


  let filteredResults;

  let mapPlaces = new Map();
  let mapCarriers = new Map();
  if (flightsResults) {
    //create mapPlaces HashMap
    flightsResults["Places"].forEach(place => {
      mapPlaces.set(place["PlaceId"], place);
    });
    console.log("map place", mapPlaces);
    //create mapCarriers HashMap
    flightsResults["Carriers"].forEach(carrier => {
      mapCarriers.set(carrier["CarrierId"], carrier["Name"]);
    });

    console.log("map Carriers", mapCarriers);
    //filter Quotes
    direct ? filteredResults = flightsResults["Quotes"].filter((deal, index) => filterByDirectFlight(deal, index)) : filteredResults = flightsResults["Quotes"];
    console.log("filteredResults", filteredResults);
    console.log("filteredResults count", filteredResults.length);
    console.log(direct);
  }

  function filterByDirectFlight(deal, index) {
    return deal["Direct"];
  }


  function handleSave(e) {
    let save = e.currentTarget.getAttribute('id');
    if (save == false) {
      let flightData = filteredResults[e.currentTarget.getAttribute('data-myattr')];
      //save the data at Parse
      const flightsData = Parse.Object.extend('flightsData');
      const myNewObject = new flightsData();
      console.log("THIS IS TEMP TEST", flightData);
      console.log("THIS IS TEMP TEST", e.currentTarget.getAttribute('data-myattr'));
      myNewObject.set('city', mapPlaces.get(flightData["OutboundLeg"]["DestinationId"]).CityName);
      myNewObject.set('cityId', cities.get(mapPlaces.get(flightData["OutboundLeg"]["DestinationId"]).CityId).IataCode);
      myNewObject.set('country', mapPlaces.get(flightData["OutboundLeg"]["DestinationId"]).CountryName);
      myNewObject.set('departureDate', new Date(flightData["OutboundLeg"]["DepartureDate"]));
      myNewObject.set('returnDate', new Date(flightData["InboundLeg"]["DepartureDate"]));
      myNewObject.set('sourcePlace', flightsResults["Places"][0].CityName ? flightsResults["Places"][0].CityName : flightsResults["Places"][0].Name);
      myNewObject.set('cost', flightData["MinPrice"]);
      myNewObject.set('direct', flightData["Direct"]);
      myNewObject.set('carriers', [mapCarriers.get(flightData["OutboundLeg"]["CarrierIds"][0]), mapCarriers.get(flightData["InboundLeg"]["CarrierIds"][0])]);
      myNewObject.set('userId', Parse.User.current());

      myNewObject.save().then(
        (result) => {
          console.log('new flightsData saved!', result);
          //change the save state (and the icon)
        },
        (error) => {
          console.error('Error while creating flightsData: ', error);
        }
      );
    } else {
      //delete the data that saved



      //change the save state (and the icon)
    }
  }

  return (
    <div className="p-search-flight">
      <CustomHeader img={Img} textLocation="flex-start" title="Search for cheapest flights with Sky Flight" text="Search and compare hundreds of flights all in one place. Find the cheapest months and dates to fly" />
      <Form>
        <Form.Row className="holder">
          <Col md={3} sm={6}>
            <Form.Label for="currency">From</Form.Label>
            <Form.Control placeholder="Country, City or airport" value={myPlace} onChange={e => setMyPlace(e.target.value)} />
          </Col>
          <Col md={3} sm={6}>
            <Form.Label for="currency">To</Form.Label>
            <Form.Control placeholder="Country, City or airport" value={destination} onChange={e => setDestination(e.target.value)} />
          </Col>
          <Col md={3} sm={6}>
            <Form.Label for="currency">Departure date</Form.Label>
            <Form.Control placeholder="" value={outBoundDate} onChange={e => setOutBoundDate(e.target.value)} />
          </Col>
          <Col md={3} sm={6}>
            <Form.Label for="currency">Return date</Form.Label>
            <Form.Control placeholder="InBoundPartialDate" value={inBoundDate} onChange={e => setInBoundDate(e.target.value)} />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col sm={6}>
            <Form.Check onClick={() => setDirect(!direct)} type="checkbox" id="autoSizingCheck" className="mb-2" label="Direct Flight" />
          </Col>
          <Col sm={6}>
            <Button onClick={callQuary}>Search</Button>
          </Col>
        </Form.Row>
      </Form>
      <p>{flightsResults && filteredResults ? "Number of results: " + filteredResults.length : "no results"}</p>
      <div className="results-holder">
        {
          flightsResults && filteredResults ?
            filteredResults.map((result, index) => <Row><SearchResult key={index}
              country={mapPlaces.get(result["OutboundLeg"]["DestinationId"]).CountryName}
              city={mapPlaces.get(result["OutboundLeg"]["DestinationId"]).CityName}
              originCity={flightsResults["Places"][0].CityName ? flightsResults["Places"][0].CityName : flightsResults["Places"][0].Name}
              dates={[result["OutboundLeg"]["DepartureDate"], result["InboundLeg"]["DepartureDate"]]}
              carrier={[mapCarriers.get(result["OutboundLeg"]["CarrierIds"][0]), mapCarriers.get(result["InboundLeg"]["CarrierIds"][0])]}
              cost={result["MinPrice"]}
              direct={result["Direct"]}
              cityData={cities.get(mapPlaces.get(result["OutboundLeg"]["DestinationId"]).CityId).IataCode}
              Save={false}
              onSave={handleSave}
              index={index} /></Row>)
            : ""
        }
      </div>
    </div>
  );
}

export default SearchFlight;