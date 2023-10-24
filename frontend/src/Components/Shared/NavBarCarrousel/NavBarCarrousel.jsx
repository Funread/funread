import React from 'react'
import './NavBarCarrousel.sass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Navbar from 'react-bootstrap/Navbar'
import _ from 'lodash'

const Carousel = ({ slides, onAddSlide }) => {
  const handleAddSlide = () => {
    onAddSlide()
  }

  return (
    <Navbar bg='light' data-bs-theme='light' className='NavbClass sticky'>
      <div className='container-fluid m-0'>
        <div className='custom_section_navbar_carrusel'>
          {_.map(slides, (slide) => (
            <div key={slide.id} className='custom_section_item_page my-3'>
              <div className='page'>
                <img
                  src={slide.image || '/imagenes/no-image.png'}
                  alt='Imagen'
                  style={{ width: '30px', height: '30px', marginRight: '1px' }}
                />
                {slide.id}
              </div>
            </div>
          ))}
          <button
            className='custom-navbar-carrousel-button'
            onClick={handleAddSlide}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
    </Navbar>
  )
}

export default Carousel
