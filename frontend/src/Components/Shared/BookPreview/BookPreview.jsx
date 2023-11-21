import React, { useState } from 'react'
import './BookPreview.sass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { fullBook } from '../../../api/books'
import { gridEnum } from '../../Utils/Enums/GridEnum' //Metodo para obtener el grid

const BookPreview = ({ bookid }) => {
  // Array de imágenes
  const imagenes = ['imagen3.jpg', 'imagen5.jpg', 'imagen6.jpg']

  const [modoPresentacion, setModoPresentacion] = useState(true)
  const [paginaActual, setPaginaActual] = useState(0)

  const avanzarPagina = () => {
    setPaginaActual((prevPagina) =>
      Math.min(prevPagina + 1, imagenes.length - 1)
    )
  }

  const retrocederPagina = () => {
    setPaginaActual((prevPagina) => Math.max(prevPagina - 1, 0))
  }

  console.log('fullBook', fullBook())

  return (
    <div className='book-preview-container'>
      {modoPresentacion && (
        <div>
          <img
            className='preview-image'
            src={`/imagenes/prueba/${imagenes[paginaActual]}`}
            alt={`Imagen ${paginaActual + 1}`}
          />

          {/* Barra de control */}
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
              <FontAwesomeIcon size='lg' icon={faArrowRight} /> Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default BookPreview
