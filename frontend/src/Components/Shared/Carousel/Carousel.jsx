import React from "react";
import Carousel from 'react-bootstrap/Carousel';

import "./Carousel.css";
import image1 from "../../../bg.jpg"
import image2 from "../../../logoFunread.png"
import image3 from "../../../placeholderBook.jpg"

class ImagesCarousel extends React.Component {
    //Es necesario pasar un arreglo de imagenes, imagenes como tal objetos, no las rutas, para que se carguen en el carusel, se debe llamar "Images"
    imagesDisplay = this.props.Images.map((image) => {
        return(
            <Carousel.Item interval={5000}>
                <img src={image} alt="..." className="ImagesCarousel-img"/>
            </Carousel.Item>
        );
    })

  render() {
    return (
        <Carousel className="carousel-width-heigt-fix">
            {this.imagesDisplay}
      </Carousel>
    );
  }
}

export default ImagesCarousel;
