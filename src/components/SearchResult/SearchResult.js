import React, { useState } from 'react';
import { Col } from 'react-bootstrap';
import Parse from 'parse';
import './SearchResult.css';

function SearchResult({ country, city, originCity, dates, carrier, cost, direct, cityData , operation }) {
    const [save, setSave] = useState(operation?true: false);
    const [imgSrc, setImgSrc] = useState("https://www.esky.eu/_fe/img/city_" + cityData + "_horizontal_0.jpg");

    let id = cityData;
    console.log("cityData",cityData );
    //I'm using 3 sets of url for img(defaults url, when error eccured, when second error accured), so if one didn't work it'll set the others
    function HandleErrorUrl() {
        if (imgSrc === "https://www.esky.eu/_fe/img/city_" + id + "_horizontal_0.jpg") {
            setImgSrc("https://static1.eskypartners.com/deals/" + id + "_1_SquareSmall_290_290.jpg")
        } else if (imgSrc === "https://static1.eskypartners.com/deals/" + id + "_1_SquareSmall_290_290.jpg") {
            setImgSrc("https://static1.eskypartners.com/deals/" + id + "_0_Rectangle_610_290.jpg")
        } else if (imgSrc === "https://static1.eskypartners.com/deals/" + id + "_0_Rectangle_610_290.jpg") {
            //default image - with no connection to the country!
            setImgSrc("https://static1.eskypartners.com/deals/CVG_0_Rectangle_610_290.jpg")
        }
    }

    function handleSave() {
        if (save === false) {
            //save the data at Parse
            const flightsData = Parse.Object.extend('flightsData');
            const myNewObject = new flightsData();

            myNewObject.set('city', city);
            myNewObject.set('cityId', cityData);
            myNewObject.set('country', country); 
            myNewObject.set('departureDate', new Date(dates[0]));
            myNewObject.set('returnDate', new Date(dates[1]));
            myNewObject.set('sourcePlace', originCity);
            myNewObject.set('cost', cost);
            myNewObject.set('direct', direct);
            myNewObject.set('carriers', carrier);
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
            setSave(!save);
        } else {
            //delete the data that saved



            //change the save state (and the icon)
            setSave(!save);
        }



    }

    // sometimes even the US needs 24-hour time
    const options = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        hour12: false,
        timeZone: 'Asia/Jerusalem' //'America/Los_Angeles'
    };

    // to specify options but use the browser's default locale, use 'default'
    // console.log(new Intl.DateTimeFormat('default', options).format(date));
    // → "12/19/2012, 19:00:00"

    return (
        <div className="c-search-result">
            <Col sm={12} md={3}>
                <img onError={HandleErrorUrl} src={imgSrc} alt={id} />
            </Col>
            <Col sm={12} md={9}>
                <div className="search-data">
                    <div>
                        <h4>{city}, {country}</h4>
                        <span onClick={handleSave}>
                            {save ? <span>&#9829;</span> : <span>&#9825;</span>}
                        </span>
                    </div>
                    <p class="flight-left"><svg width="25px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17.8 20.1l.6-.6c.2-.2.3-.5.2-.8l-2.2-9.3 4.1-4.2c.5-.5.5-1.3 0-1.9-.5-.5-1.4-.5-1.9 0l-4.2 4.1-9.1-2c-.3-.1-.6 0-.8.2l-.6.6c-.4.4-.3 1.1.2 1.4l7.2 3.2-3.7 3.7-2.3-.8c-.3-.1-.6 0-.8.2L3 15.2l4.2 1.6L8.8 21l1.3-1.5c.2-.2.3-.6.2-.8l-.8-2.3 3.7-3.7 3.2 7.2c.3.5 1 .6 1.4.2z"></path></svg> {dates[0]}</p>
                    <p class="flight-return"><svg width="25px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17.8 20.1l.6-.6c.2-.2.3-.5.2-.8l-2.2-9.3 4.1-4.2c.5-.5.5-1.3 0-1.9-.5-.5-1.4-.5-1.9 0l-4.2 4.1-9.1-2c-.3-.1-.6 0-.8.2l-.6.6c-.4.4-.3 1.1.2 1.4l7.2 3.2-3.7 3.7-2.3-.8c-.3-.1-.6 0-.8.2L3 15.2l4.2 1.6L8.8 21l1.3-1.5c.2-.2.3-.6.2-.8l-.8-2.3 3.7-3.7 3.2 7.2c.3.5 1 .6 1.4.2z"></path></svg> {dates[1]}</p>  {/* .split("T").toString() */}
                    <p>{carrier[0]}  ,{carrier[1]}</p>
                    <p>{cost} ₪</p>
                </div>
            </Col>
        </div>
    );
}

export default SearchResult;