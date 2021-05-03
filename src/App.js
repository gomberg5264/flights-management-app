import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Button, Col, Form, Row } from 'react-bootstrap';
import reportWebVitals from './reportWebVitals';

function App() {

  useEffect(() => {

  //   //GEO place
    const GEOplace = {
      method: 'GET',
      url: 'http://partners.api.skyscanner.net/apiservices/geo/v1.0?apikey=prtl6749387986743898559646983194',
  //apikey only
      headers: {
        'x-rapidapi-key': 'cdc00ae67amsh7ae44a7423a7a49p12b1aejsn6bd7ce98384d',
        'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com'
      }
    };
  
    axios.request(GEOplace).then(function (response) {
      console.log("GEO: ");
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });


    const BrowseQuotesInbound = {
      method: 'GET',
      url: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0'+
      '/il/ils/il/il/us/anytime/anytime',
  //{country}/{currency}/{locale}/{originPlace}/{destinationPlace}/{outboundPartialDate}/{inboundPartialDate}
  // market_c/ V / ISO local/ see places/ see places / see places / yyyy-mm-dd  / (optional) yyyy-mm-dd (empty string for oneway trip.)
  
      headers: {
        'x-rapidapi-key': 'cdc00ae67amsh7ae44a7423a7a49p12b1aejsn6bd7ce98384d',
        'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com'
      }
    };
  
    axios.request(BrowseQuotesInbound).then(function (response) {
      console.log("BrowseQuotesInbound: ");
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  
  
    const BrowseRoutesInbound = {
      method: 'GET',
      url: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0'+
      '/il/ils/il/il/us/anytime/anytime',
  //{country}/{currency}/{locale}/{originPlace}/{destinationPlace}/{outboundPartialDate}/{inboundPartialDate}
  // market_c/ V / ISO local/ see places/ see places / see places / yyyy-mm-dd  / (optional) yyyy-mm-dd (empty string for oneway trip.)
  
      headers: {
        'x-rapidapi-key': 'cdc00ae67amsh7ae44a7423a7a49p12b1aejsn6bd7ce98384d',
        'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com'
      }
    };
    
    axios.request(BrowseRoutesInbound).then(function (response) {
      console.log("BrowseRoutesInbound: ");
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });

  
    const BrowseDatesInbound = {
      method: 'GET',
      url: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0'+
        '/il/ils/il/elat/pari/anytime/anytime',
  //{country}/{currency}/{locale}/{originPlace}/{destinationPlace}/{outboundPartialDate}/{inboundPartialDate}
  // market_c/ V / ISO local/ see places/ see places / see places / yyyy-mm-dd  / (optional) yyyy-mm-dd (empty string for oneway trip.)
      headers: {
        'x-rapidapi-key': 'cdc00ae67amsh7ae44a7423a7a49p12b1aejsn6bd7ce98384d',
        'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com'
      }
    };
    
    axios.request(BrowseDatesInbound).then(function (response) {
      console.log("BrowseDatesInbound: ");
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }, []);

  function callAJAX(){
    //http://partners.api.skyscanner.net/apiservices/autosuggest/v1.0/il/ils/il/?query=israel&apiKey=prtl6749387986743898559646983194
    
    const myplace = {
      method: 'GET',
      url: 'http://partners.api.skyscanner.net/apiservices/autosuggest/v1.0/il/ils/il/?query=israel&apiKey=prtl6749387986743898559646983194',
      headers: {
        'x-rapidapi-key': 'cdc00ae67amsh7ae44a7423a7a49p12b1aejsn6bd7ce98384d',
        'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com'
      }
    };
    
    axios.request(myplace).then(function (response) {
      console.log("my place: ");
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
//---------------------
    const mydestination = {
      method: 'GET',
      url: 'http://partners.api.skyscanner.net/apiservices/autosuggest/v1.0/il/ils/il/?query=israel&apiKey=prtl6749387986743898559646983194',
      headers: {
        'x-rapidapi-key': 'cdc00ae67amsh7ae44a7423a7a49p12b1aejsn6bd7ce98384d',
        'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com'
      }
    };
    
    axios.request(mydestination).then(function (response) {
      console.log("destination: ");
      console.log(response.data);
      callQuary();
    }).catch(function (error) {
      console.error(error);
    });
  }

  function callQuary(){
    const BrowseDatesInbound = {
      method: 'GET',
      url: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0'+
        '/il/ils/il/elat/pari/'+{outBoundDate}+'/'+{inBoundDate},
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

  const [myPlace, setMyPlace] = useState("il");
  const [destination, setDestination] = useState("lond");
  const [outBoundDate, setOutBoundDate] = useState("2021-05-20");
  const [inBoundDate, setInBoundDate] = useState("2021-05-25");
  

  return (
    <div className="App">
      <Form>
        <Form.Row className="holder">
          <Col>
            <Form.Control placeholder="Country" value="IL"/>
          </Col>
          <Col>
            <Form.Control placeholder="Currency" value="ILS"/>
          </Col>
          <Col>
            <Form.Control placeholder="Local" value="en-US"/>
          </Col>
          <Col>
            <Form.Control placeholder="Origin-Place" value={myPlace} onChange={e => setMyPlace(e.target.value)}/>
          </Col>
          <Col>
            <Form.Control placeholder="Destination-Place" value={destination} onChange={e => setDestination(e.target.value)}/>
          </Col>
          <Col>
            <Form.Control placeholder="OutBoundPartialDate" value={outBoundDate} onChange={e => setOutBoundDate(e.target.value)}/>
          </Col>
          <Col>
            <Form.Control placeholder="InBoundPartialDate" value={inBoundDate} onChange={e => setInBoundDate(e.target.value)}/>
          </Col>
          <Col>
            <Button>submit</Button>
          </Col>
        </Form.Row>
      </Form>      
    </div>
  );
}

export default App;
