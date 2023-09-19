import { useState } from 'react'
import './BookImage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCloudUpload,
  faFileImage,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons'

const BookImage = () => {
  const [image, setImage] = useState(null)
  const [fileName, setFileName] = useState('No selected file')
  return (
    <>
      <main>
        <div className='form-container'>
          <form
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
          </form>
        </div>

        {/* <section className='uploaded-row'>
          <FontAwesomeIcon icon={faFileImage} />
          <span className='upload-content'>
            {fileName} -
            <button
              className='custom-button'
              onClick={() => {
                setFileName('No selected file')
                setImage(null)
              }}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </span>
        </section> */}
      </main>
    </>
  )
}
export default BookImage
