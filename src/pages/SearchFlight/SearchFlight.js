import React from 'react';
import './SearchFlight.css';
import { Button, Col, Form } from 'react-bootstrap';

function SearchFlight(props) {

    return (
        <div className="p-search-flight">
            search for flights
            {/* <Form>
                <Form.Row className="holder">
                    <Col>
                        <Form.Control placeholder="Country" value="IL" />
                    </Col>
                    <Col>
                        <Form.Control placeholder="Currency" value="ILS" />
                    </Col>
                    <Col>
                        <Form.Control placeholder="Local" value="en-US" />
                    </Col>
                    <Col>
                        <Form.Control placeholder="Origin-Place" value={myPlace} onChange={e => setMyPlace(e.target.value)} />
                    </Col>
                    <Col>
                        <Form.Control placeholder="Destination-Place" value={destination} onChange={e => setDestination(e.target.value)} />
                    </Col>
                    <Col>
                        <Form.Control placeholder="OutBoundPartialDate" value={outBoundDate} onChange={e => setOutBoundDate(e.target.value)} />
                    </Col>
                    <Col>
                        <Form.Control placeholder="InBoundPartialDate" value={inBoundDate} onChange={e => setInBoundDate(e.target.value)} />
                    </Col>
                    <Col>
                        <Button onClick={callQuary}>submit</Button>
                    </Col>
                </Form.Row>
            </Form> */}
        </div>
    );
}

export default SearchFlight;