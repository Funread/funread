
import './NavBarCarrousel.css'
const carousel = ({ title }) => {
  return (

    <div className="d-grid gap-2 d-md-flex justify-content-md-end" >
      <button className="btn btn-secondary" type="button"> {title}</button>

      <div className="carousel-inner">
      <div className="carousel-item active">
      <div className="card-group cardcarusel">
      </div>


      <div className="carousel-item">
        <div className="card-group cardcarusel">

        </div>
      </div>


      <div className="carousel-item">
        <div className="card-group cardcarusel">


        </div>
      </div>
    </div>

    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
      </svg>
    </button>


    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
     
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
      </svg>
    </button>

    </div>
    </div>

  );
};

export default carousel;



