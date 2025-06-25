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
import { newPage } from "../../../api/pages"
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
  const [selectedDilemmas, setSelectedDilemmas] = useState([])
  const [fileImage, setFileImage] = useState(null)
  const [missingFields, setMissingFields] = useState({})
  const user = useSelector((state) => state.user)

  const steps = [
    {
      title: 'Información Básica',
      content: 'basic',
    },
    {
      title: 'Categorización',
      content: 'category',
    },
    {
      title: 'Imagen de Portada',
      content: 'image',
    },
    {
      title: 'Revisar y Guardar',
      content: 'review',
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
        if (selectedDilemmas.length === 0) missing.dilemma = true
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
        for (const dilemma of selectedDilemmas) {
          await addDilemmasPerBook(dilemma, response.data.bookid);
        }
        toast.success('Book created successfully');
        toggleSidebar({ ...newBook });
        updateBook(newBook);
        // Limpiar el formulario
        setBook(initialBookState);
        setSelectedCategory('');
        setSelectedDimension('');
        setSelectedDilemmas([]);
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
                Público
              </Radio.Button>
              <Radio.Button className='custom-radio-button-wrapper' value={0}>
                <FontAwesomeIcon icon={faLock} className='pe-2' />
                Privado
              </Radio.Button>
            </Radio.Group>

            <Form.Control
              className={`custom-book-builder-form-title ${
                missingFields.title ? 'error-title' : ''
              }`}
              type='text'
              name='title'
              placeholder='Nombre del libro'
              value={book.title}
              onChange={handleChange}
            />
            {missingFields.title && (
              <p className='error-message'>Debes completar este campo.</p>
            )}

            <Form.Control
              className={`custom-book-builder-text-area ${
                missingFields.description ? 'error' : ''
              }`}
              as='textarea'
              placeholder='Descripción del libro'
              rows={3}
              name='description'
              value={book.description}
              onChange={handleChange}
            />
            {missingFields.description && (
              <p className='error-message'>Debes completar este campo.</p>
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
              }))}
              name='category'
              value={selectedCategory}
              onChange={handleCategoryChange}
              placeholder='Categoría'
            />
            {missingFields.category && (
              <p className='error-message'>Debes seleccionar una categoría.</p>
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
                  placeholder='Dimensión'
                />
                {missingFields.dimension && (
                  <p className='error-message'>Debes seleccionar una dimensión.</p>
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
                  placeholder='Dilemas (puedes seleccionar varios)'
                />
                {missingFields.dilemma && (
                  <p className='error-message'>Debes seleccionar al menos un dilema.</p>
                )}
              </>
            )}
          </div>
        )
      
      case 2:
        return (
          <div className="step-content">
            <p className="step-description">Sube una imagen para la portada de tu libro (opcional)</p>
            
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
                <strong>Título:</strong> {book.title}
              </div>
              <div className="review-item">
                <strong>Descripción:</strong> {book.description}
              </div>
              <div className="review-item">
                <strong>Visibilidad:</strong> {book.sharedbook === 1 ? 'Público' : 'Privado'}
              </div>
              <div className="review-item">
                <strong>Categoría:</strong> {categories.find(c => c.bookcategoryid === selectedCategory)?.name || 'No seleccionada'}
              </div>
              <div className="review-item">
                <strong>Dimensión:</strong> {dimensions.find(d => d.bookdimensionid === selectedDimension)?.name || 'No seleccionada'}
              </div>
              <div className="review-item">
                <strong>Dilemas:</strong> {selectedDilemmas.length > 0 ? selectedDilemmas.map(id => dilemmas.find(d => d.bookdilemmaid === id)?.dilemma).join(', ') : 'No seleccionados'}
              </div>
              <div className="review-item">
                <strong>Imagen de portada:</strong> {book.portrait ? 'Sí' : 'No'}
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
                  description={item.content}
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
                  Anterior
                </Button>
              )}
              
              {currentStep < steps.length - 1 && (
                <Button 
                  variant="primary" 
                  onClick={next}
                  className="step-button"
                >
                  Siguiente
                  <FontAwesomeIcon icon={faChevronRight} className="ms-2" />
                </Button>
              )}
              
              {currentStep === steps.length - 1 && (
                <Button 
                  variant="success" 
                  onClick={handleSubmit}
                  className="step-button"
                >
                  Crear Libro
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