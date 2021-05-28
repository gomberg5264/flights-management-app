import React, { useState } from 'react';
import { Col } from 'react-bootstrap';
import './SearchResult.css';

function SearchResult({country, city, cityId, dates, carrier, cost}) {
    const [save, setSave] = useState(false);
    return (
        <div className="c-search-result">
            <Col sm={12} md={3}>
                <img src={"https://www.esky.eu/_fe/img/city_"+cityId+"_horizontal_0.jpg"} alt={cityId} />
            </Col>
            <Col sm={12} md={9}>
                <div className="search-data">
                    <div>
                        <h4>{city}, {country}</h4>
                        <span onClick={() => setSave(!save)}>
                        { save?<span>&#9829;</span>:<span>&#9825;</span>}
                        </span>
                    </div>
                    <p class="flight-left"><svg width="25px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17.8 20.1l.6-.6c.2-.2.3-.5.2-.8l-2.2-9.3 4.1-4.2c.5-.5.5-1.3 0-1.9-.5-.5-1.4-.5-1.9 0l-4.2 4.1-9.1-2c-.3-.1-.6 0-.8.2l-.6.6c-.4.4-.3 1.1.2 1.4l7.2 3.2-3.7 3.7-2.3-.8c-.3-.1-.6 0-.8.2L3 15.2l4.2 1.6L8.8 21l1.3-1.5c.2-.2.3-.6.2-.8l-.8-2.3 3.7-3.7 3.2 7.2c.3.5 1 .6 1.4.2z"></path></svg> {dates[0].split("T").toString()}</p>
                    <p class="flight-return"><svg width="25px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17.8 20.1l.6-.6c.2-.2.3-.5.2-.8l-2.2-9.3 4.1-4.2c.5-.5.5-1.3 0-1.9-.5-.5-1.4-.5-1.9 0l-4.2 4.1-9.1-2c-.3-.1-.6 0-.8.2l-.6.6c-.4.4-.3 1.1.2 1.4l7.2 3.2-3.7 3.7-2.3-.8c-.3-.1-.6 0-.8.2L3 15.2l4.2 1.6L8.8 21l1.3-1.5c.2-.2.3-.6.2-.8l-.8-2.3 3.7-3.7 3.2 7.2c.3.5 1 .6 1.4.2z"></path></svg> {dates[1].split("T").toString()}</p>
                    <p>{carrier.toString()}</p>
                    <p>{cost} ₪</p>
                </div>
            </Col>
        </div>
    );
}

export default SearchResult;