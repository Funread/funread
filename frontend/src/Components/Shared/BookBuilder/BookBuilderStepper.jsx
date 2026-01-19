import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import BookImage from '../BookImage/BookImage'
import CustomSelect from '../CustomSelect/CustomSelect'
import { Radio, Steps } from 'antd'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faLock, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import { save_Image, upload } from '../../../api'
import { new_book } from '../../../api/books'

import { newPageWithWidgets } from "../../BookCreator/Utils/newPageWithWidgets";
import {
  listCategories,
  newDilemaPerBook,
  searchDilemmaByDimension,
  searchDimensionByCategory,
} from '../../../api/bookDilemma'
import './BookBuilderStepper.css'

const { Step } = Steps

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

const BookBuilderStepper = ({ toggleSidebar, updateBook }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [book, setBook] = useState(initialBookState)
  const [categories, setCategories] = useState([])
  const [dimensions, setDimensions] = useState([])
  const [dilemmas, setDilemmas] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedDimension, setSelectedDimension] = useState('')
  const [selectedDilemma, setSelectedDilemma] = useState('')
  const [fileImage, setFileImage] = useState(null)
  const [missingFields, setMissingFields] = useState({})
  const user = useSelector((state) => state.user)

  const steps = [
    {
      title: 'Basic Information',
    },
    {
      title: 'Categorization',
    },
    {
      title: 'Cover Image',
    },
    {
      title: 'Review and Save',
    },
  ]

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

  const next = () => {
    if (validateCurrentStep()) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prev = () => {
    setCurrentStep(currentStep - 1)
  }

  const validateCurrentStep = () => {
    const missing = {}

    switch (currentStep) {
      case 0: // Información básica
        if (!book.title) missing.title = true
        if (!book.description) missing.description = true
        break
      case 1: // Categorización
        if (selectedCategory === '') missing.category = true
        if (selectedDimension === '') missing.dimension = true
  if (!selectedDilemma) missing.dilemma = true
        break
      case 2: // Imagen (opcional)
        break
      default:
        break
    }

    setMissingFields(missing)
    return Object.keys(missing).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const isValid = validateForm();
      if (!isValid) {
        return;
      }

      const imageRoute = book.portrait ? await uploadImage() : null;

      const newBook = {
        ...book,
        portrait: imageRoute,
        createdby: user.userId,
        updatedby: user.userId,
        lastupdateby: user.userId,
      };

      // Espera la respuesta correctamente
      const response = await createBook(newBook);

      if (response.data && response.status === 201) {
        // Añadir los dilemas al libro creado
        if (selectedDilemma) {
          await addDilemmasPerBook(selectedDilemma, response.data.bookid);
        }
        toast.success('Book created successfully');
        updateBook(newBook);
        // Limpiar el formulario
        setBook(initialBookState);
        setSelectedCategory('');
        setSelectedDimension('');
  setSelectedDilemma('');
        setFileImage(null);
        setMissingFields({});
        setCurrentStep(0);
      } else {
        toast.error('Unable to save the book');
      }
    } catch (error) {
      toast.error('Request Error: An error occurred while processing your request');
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

    if (!selectedDilemma) {
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
    // galleryType = 7 para portadas de libro (BookCover)
    return await save_Image(fileImage, 7)
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
    ).then((book) => {
      newPageWithWidgets(
              book.data.bookid,
                  1,
                  0,
                  0,
                  "1",
                  1
                )
                return book;
        })




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
      
    }
  }

  const handleDimensionChange = async (selectedValue) => {
    setSelectedDimension(selectedValue)
    try {
      const dilemmasResponse = await searchDilemmaByDimension(selectedValue)
      setDilemmas(dilemmasResponse.data)
    } catch (error) {
      
    }
  }

  const handleDilemmaChange = (selectedValue) => {
    setSelectedDilemma(selectedValue)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="step-content">
            
            <Radio.Group
              onChange={handleSharedBookChange}
              required
              value={book.sharedbook}
              className="visibility-group"
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

            <Form.Control
              className={`custom-book-builder-form-title ${
                missingFields.title ? 'error-title' : ''
              }`}
              type='text'
              name='title'
              placeholder='Book name'
              value={book.title}
              onChange={handleChange}
            />
            {missingFields.title && (
              <p className='error-message'>You must complete this field.</p>
            )}

            <Form.Control
              className={`custom-book-builder-text-area ${
                missingFields.description ? 'error' : ''
              }`}
              as='textarea'
              placeholder='Book description'
              rows={3}
              name='description'
              value={book.description}
              onChange={handleChange}
              maxLength={500}
            />
            <div className="text-end text-muted small">
              {book.description.length}/500 characters
            </div>
            {missingFields.description && (
              <p className='error-message'>You must complete this field.</p>
            )}
          </div>
        )
      
      case 1:
        return (
          <div className="step-content">
            
            <CustomSelect
              classNameStyle={`custom-book-builder-select ${
                missingFields.category ? 'error' : ''
              }`}
              options={categories.map((category) => ({
                key: category.bookcategoryid,
                value: category.bookcategoryid,
                label: category.name,
                tooltip: category.description
              }))}
              name='category'
              value={selectedCategory}
              onChange={handleCategoryChange}
              placeholder='Category'
              showOptionIcon={true}
            />
            {missingFields.category && (
              <p className='error-message'>You must select a category.</p>
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
                    tooltip: dimension.description
                  }))}
                  name='dimension'
                  value={selectedDimension}
                  onChange={handleDimensionChange}
                  placeholder='Dimension'
                  showOptionIcon={true}
                />
                {missingFields.dimension && (
                  <p className='error-message'>You must select a dimension.</p>
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
                    tooltip: dilemma.description
                  }))}
                  name='dilemma'
                  value={selectedDilemma}
                  onChange={handleDilemmaChange}
                  placeholder='Dilemma'
                  showOptionIcon={true}
                />
                {missingFields.dilemma && (
                  <p className='error-message'>You must select a dilemma.</p>
                )}
              </>
            )}
          </div>
        )
      
      case 2:
        return (
          <div className="step-content">
            <p className="step-description">Upload an image for your book cover (optional)</p>
            
            <BookImage
              onImageSelect={handleImageSelect}
              updateBookPortrait={updateBookPortrait}
            />
          </div>
        )
      
      case 3:
        return (
          <div className="step-content">
            
            <div className="review-section">
              <div className="review-item">
                <strong>Title:</strong> {book.title}
              </div>
              <div className="review-item">
                <strong>Description:</strong> {book.description}
              </div>
              <div className="review-item">
                <strong>Visibility:</strong> {book.sharedbook === 1 ? 'Public' : 'Private'}
              </div>
              <div className="review-item">
                <strong>Category:</strong> {categories.find(c => c.bookcategoryid === selectedCategory)?.name || 'Not selected'}
              </div>
              <div className="review-item">
                <strong>Dimension:</strong> {dimensions.find(d => d.bookdimensionid === selectedDimension)?.name || 'Not selected'}
              </div>
              <div className="review-item">
                <strong>Dilemma:</strong> {selectedDilemma ? dilemmas.find(d => d.bookdilemmaid === selectedDilemma)?.dilemma : 'Not selected'}
              </div>
              <div className="review-item">
                <strong>Cover image:</strong> {book.portrait ? 'Yes' : 'No'}
              </div>
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <Container className="stepper-container">
      <Row>
        <Col>
          <div className="stepper-wrapper">
            <Steps 
              current={currentStep} 
              className="custom-steps"
              size="default"
              progressDot={false}
            >
              {steps.map((item, index) => (
                <Step 
                  key={index} 
                  title={item.title}
                />
              ))}
            </Steps>
            
            <div className="steps-content">
              {renderStepContent()}
            </div>
            
            <div className="steps-action">
              {currentStep > 0 && (
                <Button 
                  variant="outline-secondary" 
                  onClick={prev}
                  className="step-button"
                >
                  <FontAwesomeIcon icon={faChevronLeft} className="me-2" />
                  Previous
                </Button>
              )}
              
              {currentStep < steps.length - 1 && (
                <Button 
                  variant="primary" 
                  onClick={next}
                  className="step-button"
                >
                  Next
                  <FontAwesomeIcon icon={faChevronRight} className="ms-2" />
                </Button>
              )}
              
              {currentStep === steps.length - 1 && (
                <Button 
                  variant="success" 
                  onClick={handleSubmit}
                  className="step-button"
                >
                  Create Book
                </Button>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default BookBuilderStepper