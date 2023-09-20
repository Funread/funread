import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUpload } from '@fortawesome/free-solid-svg-icons'

const BookImage = ({ onImageSelect }) => {
  const [image, setImage] = useState(null)
  const [fileName, setFileName] = useState('No selected file')

  const handleImageChange = (e) => {
    const file = e.target.files[0]

    if (file) {
      setFileName(file.name)
      const imageUrl = URL.createObjectURL(file)
      setImage(imageUrl)
      onImageSelect(file) // Pasa el archivo seleccionado al componente padre
    }
  }

  return (
    <div
      className='custom-form'
      onClick={() => document.querySelector('.input-field').click()}
    >
      <input
        className='input-field'
        name='portrait'
        type='file'
        accept='image/*'
        hidden
        onChange={handleImageChange}
      />
      <div className='image-container p-0'>
        {image && (
          <img
            src={image}
            alt={fileName}
            className='rounded-image'
            style={{ width: '140px', height: '230px' }}
          />
        )}
        {!image && (
          <div>
            <FontAwesomeIcon size='3x' icon={faCloudUpload} />
            <p>Import book cover</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default BookImage
