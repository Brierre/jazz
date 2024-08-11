import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import CarouselImage1 from './assets/images/contrabass-1249682_1280.png';
import CarouselImage2 from './assets/images/drum-1287910_1280.png';
import CarouselImage3 from './assets/images/guitar-1424478_1280.png';
import CarouselImage4 from './assets/images/piano-1287912_1280.png';
import CarouselImage5 from './assets/images/saxophone-1287911_1280.png';
import CarouselImage6 from './assets/images/trumpet-1500574_1280.png';


function ImgCarousel() {
    return (
        <div className='carousel'>
            <Carousel>
                <Carousel.Item>
                    <img src={CarouselImage1} alt='cool cat playing upright bass' height='300px' />                
                        <Carousel.Caption><p></p></Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={CarouselImage2} alt='cool cat playing drum set' height='300px' />
                    <Carousel.Caption><p></p></Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={CarouselImage3} alt='cool cat playing guitar' height='300px' />
                    <Carousel.Caption><p></p></Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={CarouselImage4} alt='cool cat playing the keys' height='300px' />                
                    <Carousel.Caption><p></p></Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={CarouselImage5} alt='cool cat playing saxophone' height='300px' />                
                    <Carousel.Caption><p></p></Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={CarouselImage6} alt='cool cat playing trumpet' height='300px' />                
                    <Carousel.Caption><p></p></Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default ImgCarousel;