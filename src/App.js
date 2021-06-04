import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import SearchFlight from './pages/SearchFlight/SearchFlight';
import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import MyFlights from './pages/MyFlights/MyFlights';
import DealsPage from './pages/DealsPage/DealsPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import LoginPage from './pages/LoginPage/LoginPage';
import UserModel from './model/UserModel';
import { HashRouter, Route, Switch } from 'react-router-dom';
import CustomNavBar from './components/CustomNavBar/CustomNavBar';
import Parse from 'parse';


function App() {

  useEffect(() => {
  //GEO place
    const pathPre = process.env.PUBLIC_URL;
    axios.get(pathPre.concat("/geoData.json")).then(response => {
      let cities = new Map()
      response.data.Continents.forEach( land => 
        land.Countries.forEach(country => 
          country.Cities.forEach( city => cities.set(city.Id,city))
        )
      );
      setCities(cities);

      console.log("GEO MAP", cities);
      console.log("GEO MAP - example", cities.get("DLZA")["Name"]);
    }).catch( err => console.error(err));
    console.log("GEO MAP", cities);

  //   const GEOplace = {
  //     method: 'GET',
  //     url: 'http://partners.api.skyscanner.net/apiservices/geo/v1.0?apikey=prtl6749387986743898559646983194',
  // //apikey only
  //     headers: {
  //       'x-rapidapi-key': 'cdc00ae67amsh7ae44a7423a7a49p12b1aejsn6bd7ce98384d',
  //       'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com'
  //     }
  //   };
  
  //   axios.request(GEOplace).then(function (response) {
  //     console.log("GEO: ");
  //     console.log(response.data);
  //   }).catch(function (error) {
  //     console.error(error);
  //   });


    const BrowseQuotesInbound = {
      method: 'GET',
      url: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0'+
      '/il/ils/il/il/anywhere/anytime/anytime',
  //{country}/{currency}/{locale}/{originPlace}/{destinationPlace}/{outboundPartialDate}/{inboundPartialDate}
  // market_c/ V / ISO local/ see places/ see places / see places / yyyy-mm-dd  / (optional) yyyy-mm-dd (empty string for oneway trip.)
  
      headers: {
        'x-rapidapi-key': 'cdc00ae67amsh7ae44a7423a7a49p12b1aejsn6bd7ce98384d',
        'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com'
      }
    };
  
    axios.request(BrowseQuotesInbound).then(function (response) {
      setDeals(response.data);
      console.log("BrowseQuotesInbound: ");
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });

    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    month = month <10? "0"+month: month;

    const BrowseQuotesInboundMonth = {
      method: 'GET',
      url: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0'+
      '/il/ils/il/il/anywhere/'+year+'-'+month+'/'+year,
  //{country}/{currency}/{locale}/{originPlace}/{destinationPlace}/{outboundPartialDate}/{inboundPartialDate}
  // market_c/ V / ISO local/ see places/ see places / see places / yyyy-mm-dd  / (optional) yyyy-mm-dd (empty string for oneway trip.)
  
      headers: {
        'x-rapidapi-key': 'cdc00ae67amsh7ae44a7423a7a49p12b1aejsn6bd7ce98384d',
        'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com'
      }
    };
  
    axios.request(BrowseQuotesInboundMonth).then(function (response) {
      setMonthDeals(response.data);
      console.log("Monthly: ");
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  
  //not use for now!!!
  //   const BrowseRoutesInbound = {
  //     method: 'GET',
  //     url: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0'+
  //     '/il/ils/il/il/us/anytime/anytime',
  // //{country}/{currency}/{locale}/{originPlace}/{destinationPlace}/{outboundPartialDate}/{inboundPartialDate}
  // // market_c/ V / ISO local/ see places/ see places / see places / yyyy-mm-dd  / (optional) yyyy-mm-dd (empty string for oneway trip.)
  
  //     headers: {
  //       'x-rapidapi-key': 'cdc00ae67amsh7ae44a7423a7a49p12b1aejsn6bd7ce98384d',
  //       'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com'
  //     }
  //   };
    
  //   axios.request(BrowseRoutesInbound).then(function (response) {
  //     console.log("BrowseRoutesInbound: ");
  //     console.log(response.data);
  //   }).catch(function (error) {
  //     console.error(error);
  //   });

  
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



    const myPlace = {
      method: 'GET',
      url: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/',
      params: {query: 'israel'},
      headers: {
        'x-rapidapi-key': 'a94342958cmsh1dbb3ae79906020p1a4c7ajsn53656455ddcb',
        'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com'
      }
    };
    
    axios.request(myPlace).then(function (response) {
      console.log("my place");
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });


    const myDest = {
      method: 'GET',
      url: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/',
      params: {id: 'elat'},
      headers: {
        'x-rapidapi-key': 'a94342958cmsh1dbb3ae79906020p1a4c7ajsn53656455ddcb',
        'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com'
      }
    };
    
    axios.request(myDest).then(function (response) {
      console.log("my id");
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }, []);

  const [cities, setCities] = useState(new Map());
  const [deals, setDeals] = useState();
  const [monthDeals, setMonthDeals] = useState();
  const [activeUser, setActiveUser] = useState(Parse.User.current()? new UserModel(Parse.User.current()):null);

    function handleLogout() {
      setActiveUser(null);
      Parse.User.logOut();
    }

  return (
    <div className="App">
      <CustomNavBar activeUser={activeUser} onLogOut={handleLogout}/>
      <HashRouter>
        <Switch>
          <Route exact path="/"><HomePage activeUser={activeUser}/></Route>
          <Route exact path="/login"><LoginPage activeUser={activeUser} onLogin={(user) => setActiveUser(user)}/></Route>
          <Route exact path="/signup"><SignUpPage activeUser={activeUser} onSignUp={(user) => setActiveUser(user)}/></Route>
          <Route exact path="/deals"><DealsPage activeUser={activeUser} deals={deals} month={monthDeals} citiesList={cities}/></Route>
          <Route exact path="/search-flight"><SearchFlight activeUser={activeUser} cities={cities}/></Route>
          <Route exact path="/my-fav-flights"><MyFlights activeUser={activeUser} cities={cities}/></Route>
          <Route path="/"><NotFoundPage/></Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
