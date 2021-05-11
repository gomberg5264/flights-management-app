import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import './CustomCarousel.css'

function CustomCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://www.esky.eu/_fe/img/city_MAD_horizontal_0.jpg"
                    alt="Madrid"
                />
                <Carousel.Caption>
                    <h3>Madrid</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://www.esky.eu/_fe/img/city_LON_horizontal_0.jpg"
                    alt="London"
                />

                <Carousel.Caption>
                    <h3>London</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://www.esky.eu/_fe/img/city_DXB_horizontal_0.jpg"
                    alt="Dubai"
                />

                <Carousel.Caption>
                    <h3>Dubai</h3>
                    <p> Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://www.esky.eu/_fe/img/city_TLV_horizontal_0.jpg"
                    alt="Tel Aviv"
                />

                <Carousel.Caption>
                    <h3>Tel Aviv</h3>
                    <p> Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://www.esky.eu/_fe/img/city_STO_horizontal_0.jpg"
                    alt="Stockholm"
                />

                <Carousel.Caption>
                    <h3>Stockholm</h3>
                    <p> Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default CustomCarousel;