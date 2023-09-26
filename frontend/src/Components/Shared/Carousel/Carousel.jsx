import React,{useState} from "react";
import Carousel from 'react-bootstrap/Carousel';

import "./Carousel.css";
import image1 from "../../../bg.jpg"
import image2 from "../../../logoFunread.png"
import image3 from "../../../placeholderBook.jpg"
import { useEffect } from 'react';


class ImagesCarousel extends React.Component {

  //props = [timeSlideInSeconds, ]

  //Es necesario pasar un arreglo de imagenes, imagenes como tal objetos, no las rutas, para que se carguen en el carusel, se debe llamar "Images"
  imagesDisplay = this.props.Images.map((image,index) => {
    return(
        <Carousel.Item interval={parseInt(this.props.timeSlideInSeconds) * 1000} key={index}>
            <img src={image} alt="..." className="ImagesCarousel-img"/>
        </Carousel.Item>
    );
  })

  render() {
    return (
        <Carousel className="carousel-width-heigt-fix" controls={this.props.controls!=null?this.props.controls:true}>
            {this.imagesDisplay}
      </Carousel>
    );
  }
}

export default ImagesCarousel;