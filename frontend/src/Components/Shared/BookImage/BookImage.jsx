import { useState } from 'react'
import './BookImage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUpload } from '@fortawesome/free-solid-svg-icons'

const BookImage = () => {
  const [image, setImage] = useState(null)
  const [fileName, setFileName] = useState('No selected file')
  return (
    <>
      <main>
        <div className='form-container'>
          <div
            className='custom-form'
            onClick={() => document.querySelector('.input-field').click()}
          >
            <input
              className='input-field'
              type='file'
              accept='image/*'
              hidden
              onChange={({ target: { files } }) => {
                files[0] && setFileName(files[0].name)
                if (files) {
                  setImage(URL.createObjectURL(files[0]))
                }
              }}
            />
            <div className='image-container p-0'>
              {image && (
                <img src={image} alt={fileName} className='rounded-image' />
              )}
              {!image && (
                <div>
                  <FontAwesomeIcon size='3x' icon={faCloudUpload} />
                  <p>Import book cover</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default BookImage
