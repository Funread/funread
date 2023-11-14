import './BookBuilder.sass'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import BookImage from '../BookImage/BookImage'
import CustomSelect from '../CustomSelect/CustomSelect'
import { Radio } from 'antd'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faLock } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import { save_Image, upload } from '../../../api'
import { new_book } from '../../../api/books'
import {
  listCategories,
  newDilemaPerBook,
  searchDilemmaByDimension,
  searchDimensionByCategory,
} from '../../../api/bookDilemma'
import { useNavigate } from 'react-router-dom'

const initialBookState = {
  title: '',
  category: '',
  portrait: null,
  createdby: null,
  updatedby: null,
  state: 0,
  sharedbook: 0,
  lastupdateby: null,
  description: '',
}

const BookBuilder = ({ toggleSidebar, updateBook }) => {
  const [book, setBook] = useState(initialBookState)
  const [categories, setCategories] = useState([])
  const [dimensions, setDimensions] = useState([])
  const [dilemmas, setDilemmas] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedDimension, setSelectedDimension] = useState('')
  const [selectedDilemmas, setSelectedDilemmas] = useState([])
  const [fileImage, setFileImage] = useState(null)
  const [missingFields, setMissingFields] = useState({})
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      try {
        const categoriesResponse = await listCategories()
        setCategories(categoriesResponse.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setBook({ ...book, [name]: value })
  }

  const handleSharedBookChange = (e) => {
    setBook({ ...book, sharedbook: e.target.value })
  }

  const handleImageSelect = (selectedImage) => {
    setFileImage(selectedImage)
  }

  const updateBookPortrait = (fileName) => {
    setBook({ ...book, portrait: fileName })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Validar campos
      const isValid = validateForm()
      if (!isValid) {
        return
      }

      const imageRoute = book.portrait ? await uploadImage() : null

      // Crear libro con ruta de imagen
      const newBook = {
        ...book,
        portrait: imageRoute,
        createdby: user.userId,
        updatedby: user.userId,
        lastupdateby: user.userId,
      }

      // // Enviar libro al servidor
      const response = await createBook(newBook)

      if (response.data && response.status === 201) {
        //Añadir los dilemas al libro creado
        for (const dilemma of selectedDilemmas) {
          await addDilemmasPerBook(dilemma, response.data.bookid)
        }
        toast.success('Book created successfully')

        toggleSidebar({ ...newBook })
        updateBook(newBook)

        navigate('/bookcreator', {
          state: {
            data: response.data,
          }
        });
      } else {
        toast.error('Unable to save the book')
      }
    } catch (error) {
      toast.error(
        'Request Error: An error occurred while processing your request'
      )
    }
  }

  const validateForm = () => {
    const missing = {}

    if (!book.title) {
      missing.title = true
    }

    if (!book.description) {
      missing.description = true
    }

    if (selectedCategory === '') {
      missing.category = true
    }

    if (selectedDimension === '') {
      missing.dimension = true
    }

    if (selectedDilemmas.length === 0) {
      missing.dilemma = true
    }

    setMissingFields(missing)
    return Object.keys(missing).length === 0
  }

  const uploadImage = async () => {
    const response1 = await saveImageFile()

    if (!response1.data || !response1.data.name) {
      throw new Error('Error uploading the image')
    }

    const imageName = response1.data.name
    const response2 = await getImageRoute(imageName)

    if (!response2.data || !response2.data.file_route) {
      throw new Error('Error getting the image route')
    }

    return response2.data.file_route
  }

  const saveImageFile = async () => {
    return await save_Image(fileImage)
  }

  const getImageRoute = async (imageName) => {
    return await upload(imageName)
  }

  const createBook = async (newBook) => {
    return await new_book(
      newBook.title,
      newBook.category,
      newBook.portrait,
      newBook.createdby,
      newBook.updatedby,
      newBook.state,
      newBook.sharedbook,
      newBook.lastupdateby,
      newBook.description
    )
  }

  const addDilemmasPerBook = async (dilemma, bookId) => {
    return await newDilemaPerBook(dilemma, bookId)
  }

  const handleCategoryChange = async (selectedValue) => {
    setSelectedCategory('')
    setSelectedDimension('')
    setBook({ ...book, category: selectedValue })
    setSelectedCategory(selectedValue)
    try {
      const dimensionsResponse = await searchDimensionByCategory(selectedValue)
      setDimensions(dimensionsResponse.data)
    } catch (error) {
      console.log('Error', error)
    }
  }

  const handleDimensionChange = async (selectedValue) => {
    setSelectedDimension(selectedValue)
    try {
      const dilemmasResponse = await searchDilemmaByDimension(selectedValue)
      setDilemmas(dilemmasResponse.data)
    } catch (error) {
      console.log('Error', error)
    }
  }

  const handleDilemmaChange = (selectedValues) => {
    setSelectedDilemmas(selectedValues)
  }

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Radio.Group
              onChange={handleSharedBookChange}
              required
              value={book.sharedbook}
              style={{ marginTop: '50px', marginBottom: '30px' }}
            >
              <Radio.Button className='custom-radio-button-wrapper' value={1}>
                <FontAwesomeIcon icon={faGlobe} className='pe-2' />
                Public
              </Radio.Button>
              <Radio.Button className='custom-radio-button-wrapper' value={0}>
                <FontAwesomeIcon icon={faLock} className='pe-2' />
                Private
              </Radio.Button>
            </Radio.Group>

            <BookImage
              onImageSelect={handleImageSelect}
              updateBookPortrait={updateBookPortrait}
            />

            <Form.Control
              className={`custom-book-builder-form-title ${
                missingFields.title ? 'error-title' : ''
              }`}
              type='text'
              name='title'
              placeholder='Name of the book'
              value={book.title}
              onChange={handleChange}
            />
            {missingFields.title && (
              <p className='error-message'>You need to fill this field.</p>
            )}

            <Form.Control
              className={`custom-book-builder-text-area ${
                missingFields.description ? 'error' : ''
              }`}
              as='textarea'
              placeholder='Description'
              rows={4}
              name='description'
              value={book.description}
              onChange={handleChange}
            />
            {missingFields.description && (
              <p className='error-message'>You need to fill this field.</p>
            )}

            <CustomSelect
              classNameStyle={`custom-book-builder-select ${
                missingFields.category ? 'error' : ''
              }`}
              options={categories.map((category) => ({
                key: category.bookcategoryid,
                value: category.bookcategoryid,
                label: category.name,
              }))}
              name='category'
              value={selectedCategory}
              onChange={handleCategoryChange}
              placeholder='Category'
            />
            {missingFields.category && (
              <p className='error-message'>You need to fill this field.</p>
            )}

            {selectedCategory && (
              <>
                <CustomSelect
                  classNameStyle={`custom-book-builder-select ${
                    missingFields.dimension ? 'error' : ''
                  }`}
                  options={dimensions.map((dimension) => ({
                    key: dimension.bookdimensionid,
                    value: dimension.bookdimensionid,
                    label: dimension.name,
                  }))}
                  name='dimension'
                  value={selectedDimension}
                  onChange={handleDimensionChange}
                  placeholder='Dimension'
                />
                {missingFields.dimension && (
                  <p className='error-message'>You need to fill this field.</p>
                )}
              </>
            )}

            {selectedDimension && (
              <>
                <CustomSelect
                  classNameStyle={`custom-book-builder-select ${
                    missingFields.dilemma ? 'error' : ''
                  }`}
                  options={dilemmas.map((dilemma) => ({
                    key: dilemma.bookdilemmaid,
                    value: dilemma.bookdilemmaid,
                    label: dilemma.dilemma,
                  }))}
                  mode='multiple'
                  name='dilemma'
                  value={selectedDilemmas}
                  onChange={handleDilemmaChange}
                  placeholder='Dilemma'
                />
                {missingFields.dilemma && (
                  <p className='error-message'>You need to fill this field.</p>
                )}
              </>
            )}

            <button className='custom-save-button' type='submit'>
              Save
            </button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default BookBuilder
