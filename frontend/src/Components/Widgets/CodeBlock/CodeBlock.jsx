import React from 'react';
import "./CodeBlock.css";
import 'bootstrap/js/dist/dropdown'
import { Container, Row, Col, Form } from 'react-bootstrap'



function CodeBlock (){
  return(

  <Container>
      <Row>
        <Col>
          <Form>
           <label>
              Code HTML
           </label>

            <Form.Control
              className='custom-book-builder-text-area'
              as='textarea'
              placeholder='Code'
              rows={5}
              name='content'
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
export default CodeBlock;