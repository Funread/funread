import React, { useState } from 'react'
import './BookPreview.sass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faTimes } from '@fortawesome/free-solid-svg-icons'

const BookPreview = ({ bookid, onClose }) => {
  const imagenes = ['imagen3.jpg', 'imagen5.jpg', 'imagen6.jpg']
  const [paginaActual, setPaginaActual] = useState(0)

  const avanzarPagina = () => {
    setPaginaActual((prevPagina) =>
      Math.min(prevPagina + 1, imagenes.length - 1)
    )
  }

  const retrocederPagina = () => {
    setPaginaActual((prevPagina) => Math.max(prevPagina - 1, 0))
  }

  return (
    <div className='modal-overlay-preview'>
      <div className='preview-content'>
        <button className='close-button' onClick={onClose}>
          <FontAwesomeIcon size='lg' icon={faTimes} />
        </button>

        <img
          className='preview-image'
          src={`/imagenes/prueba/${imagenes[paginaActual]}`}
          alt={`Imagen ${paginaActual + 1}`}
        />

        <div className='preview-controls'>
          <button
            className='control-button'
            onClick={retrocederPagina}
            disabled={paginaActual === 0}
          >
            <FontAwesomeIcon size='lg' icon={faArrowLeft} /> Prev
          </button>
          <span>
            Page {paginaActual + 1} of {imagenes.length}
          </span>
          <button
            className='control-button'
            onClick={avanzarPagina}
            disabled={paginaActual === imagenes.length - 1}
          >
            Next <FontAwesomeIcon size='lg' icon={faArrowRight} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookPreview
