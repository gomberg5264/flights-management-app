import React, { useState } from 'react';
import './SearchFlight.css';
import { Button, Col, Form } from 'react-bootstrap';
import axios from 'axios';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import Img from '../../assets/search1.jpg';

function SearchFlight(props) {

  const [myPlace, setMyPlace] = useState("il");
  const [destination, setDestination] = useState("lond");
  const [outBoundDate, setOutBoundDate] = useState("2021-05-20");
  const [inBoundDate, setInBoundDate] = useState("2021-05-25");

  function callQuary() {
    const BrowseDatesInbound = {
      method: 'GET',
      url: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0' +
        '/il/ils/il/elat/pari/' + outBoundDate + '/' + inBoundDate,
      //{country}/{currency}/{locale}/{originPlace}/{destinationPlace}/{outboundPartialDate}/{inboundPartialDate}
      // market_c/ V / ISO local/ see places/ see places / see places / yyyy-mm-dd  / (optional) yyyy-mm-dd (empty string for oneway trip.)
      headers: {
        'x-rapidapi-key': 'cdc00ae67amsh7ae44a7423a7a49p12b1aejsn6bd7ce98384d',
        'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com'
      }
    };

    axios.request(BrowseDatesInbound).then(function (response) {
      console.log("BrowseDatesInbound:  FINAL RESULTS ");
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }

  return (
    <div className="p-search-flight">
      <CustomHeader img={Img} textLocation="flex-start" title="Search for cheapest flights with Sky Flight" text="Search and compare hundreds of flights all in one place. Find the cheapest months and dates to fly"/>
      <Form>
        <Form.Row className="holder">
          <Col>
            <Form.Label for="country">Enter country</Form.Label>
            <Form.Control id="country" placeholder="Country"/>
          </Col>
          <Col>
            <Form.Label for="currency">Choose currency</Form.Label>
            <Form.Control placeholder="Origin-Place" value={myPlace} onChange={e => setMyPlace(e.target.value)} />
          </Col>
          <Col>
            <Form.Label for="currency">Choose currency</Form.Label>
            <Form.Control placeholder="Destination-Place" value={destination} onChange={e => setDestination(e.target.value)} />
          </Col>
          <Col>
            <Form.Label for="currency">Choose currency</Form.Label>
            <Form.Control placeholder="OutBoundPartialDate" value={outBoundDate} onChange={e => setOutBoundDate(e.target.value)} />
          </Col>
          <Col>
            <Form.Label for="currency">Choose currency</Form.Label>
            <Form.Control placeholder="InBoundPartialDate" value={inBoundDate} onChange={e => setInBoundDate(e.target.value)} />
          </Col>
          <Col>
            <Button onClick={callQuary}>submit</Button>
          </Col>
        </Form.Row>
        <Form.Row className="details">
          <Form.Check type="checkbox" id="autoSizingCheck" className="mb-2" label="Direct Flight" />
        </Form.Row>
      </Form>
    </div>
  );
}

export default SearchFlight;