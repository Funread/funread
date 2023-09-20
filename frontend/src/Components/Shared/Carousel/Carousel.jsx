import './Carousel.css';
import React from 'react';


function Carousel() {
  return (
    <div className="carousel-container">
    <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="/Estudiantes1 - Copy.jpeg" className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
          <img src="/Estudiantes2 - Copy.jpg" className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
          <img src="/Estudiantes3 - Copy.jpg" className="d-block w-100" alt="..." />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  </div>
  );
}

export default Carousel;