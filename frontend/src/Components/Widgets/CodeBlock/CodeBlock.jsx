import "./CodeBlock.css";
import jwt_decode from 'jwt-decode'
import { toast } from 'react-toastify'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { newCode } from '../../../api/widgets/CodeBlock';
import { useEffect, useState } from 'react';

const initialState = {
  widgetitemid: null,
  value: '',
  type: null,
  pageid: null,
  widgetid: null,
}

const CodeBlock= ({ CodeBlock}) => {
  const [Code, setCode] = useState(initialState)
  const [isEmpty, setIsEmpty] = useState(false)
  const token = sessionStorage.getItem('jwt')

  useEffect(() => {
    // Decodifica el JWT cuando el componente se monta
    if (token) {
      const decodedToken = jwt_decode(token)

      // Actualiza el estado del code con la información del JWT
      setCode((prevData) => ({
        ...prevData,
        widgetid: decodedToken.user_id,
      }))
    }
  }, [token])

  const handleChange = (e) => {
    const { value } = e.target
    setCode({ ...Code, [value]: value })
    if (value.trim() !== '') {
      setIsEmpty(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    /*if (Code.value.trim() === '' || Code.image.trim() === '') {
      setIsEmpty(true)
      return
    }*/

    try {
      const response = await newCode(
        Code.widgetitemid,
        Code.value,
        Code.type,
        Code.pageid,
        Code.widgetid
      )
      toast.success(`${response.data.value} was created successfully`)
      CodeBlock(response.data)
      setCode({ ...Code, value: ''})
    } catch (error) {
      toast.error(
        'Request Error: An error occurred while processing your request'
      )
    }
  }


  return(

  <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
           <label>
              Code HTML
           </label>

            <Form.Control
              className={`${isEmpty ? 'empty-input' : 'mb-3'}`}
              as='textarea'
              placeholder='Code'
              rows={5}
              name='value'
              onChange={handleChange}
              //value={Code.value}
            />
            <button className='custom-save-button-HTML' type='submit'>
              Save
            </button>
          </Form>
        </Col>
      </Row>
    </Container>

 
  );

}
export default CodeBlock