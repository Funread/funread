import jwt_decode from 'jwt-decode'
import { toast } from 'react-toastify'
import './CodeBlock.sass'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { newWidget } from '../../../api/widget';
import { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';

const initialState = {
  widgetitemid: null,
  value: '',
  type: null,
  pageid: null,
  widgetid: null,
}

const widgetType = 'widgetType'



const CodeBlock = () => {
  const [Widget, setWidget] = useState(initialState)
  const [CodeHTML, setCodeHTML] = useState(null)

  
  const [{ isDragging }, drag] = useDrag({
    type: widgetType,
    item: { type: 'CodeBlock' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })


  /*const handleChange = (e) => {
    const { value } = e.target
    setWidget({ ...Witget, [value]: value })
    if (value.trim() !== '') {
      setIsEmpty(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()*/

    /*if (Code.value.trim() === '' || Code.image.trim() === '') {
      setIsEmpty(true)
      return
    }*/

   /* try {
      const response = await newWidget(
        Witget.widgetitemid,
        Witget.value,
        Widget.type,
        Widget.pageid,
        Widget.widgetid
      )
      toast.success(`${response.data.value} was created successfully`)
      WidgetID(response.data)
      setWidget({ ...Witget, value: ''})
    } catch (error) {
      toast.error(
        'Request Error: An error occurred while processing your request'
      )
    }
  }*/
  const handleCodeChange = (e) => {
    const newCode = e.target.value
    setCodeHTML(newCode)
  }


  return(
<div ref={drag}>
  <Container>
      <Row>
        <Col>
          <div className='d-flex flex-column'>
           <label>
              Code HTML
           </label>
           <textarea value={CodeHTML} onChange={handleCodeChange}/>
            <button className='custom-save-button-HTML' type='submit'>
              Save
            </button>
          </div>
        </Col>
      </Row>
    </Container>
</div>
 
  );

}
export default CodeBlock
