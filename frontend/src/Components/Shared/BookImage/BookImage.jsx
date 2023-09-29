import React, { useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUpload } from '@fortawesome/free-solid-svg-icons'

const BookImage = ({ onImageSelect, portrait }) => {
  const [image, setImage] = useState(null)
  const [fileName, setFileName] = useState('No selected file')
  const fileInputRef = useRef(null)

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
      className='custom-image-form'
      onClick={() => fileInputRef.current.click()}
    >
      <Form.Control
        ref={fileInputRef}
        className='input-field'
        type='file'
        name='portrait'
        accept='image/*'
        value={portrait}
        onChange={handleImageChange}
        hidden
      />
      {image ? (
        <img src={image} width={140} height={230} alt={fileName} />
      ) : (
        <div>
          <FontAwesomeIcon size='3x' icon={faCloudUpload} />
          <p>Import book cover</p>
        </div>
      )}
    </div>
  )
}

export default BookImage
