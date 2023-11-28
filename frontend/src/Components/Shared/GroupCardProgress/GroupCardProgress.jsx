import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import {
  faBook,
  faBookReader,
  faFile,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css'
import './GroupCardProgress.sass'

function GroupCardProgress() {
  return (
    <Row xs={1} md={4} className='bg-4 mt-4 mx-auto'>
      <Col>
        <Card className='border mt-1 custum-card' bg='white'>
          <Card.Body>
            <div>
              <FontAwesomeIcon
                className='fa-bookss'
                size='2xl'
                icon={faBook}
              ></FontAwesomeIcon>
              <div className='custum-text-authors'>
                <strong>13</strong>
                <br />
                Complete Task
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className='border mt-1 custum-card' bg='white'>
          <Card.Body>
            <div>
              <FontAwesomeIcon
                className='fa-user'
                size='2xl'
                icon={faUser}
              ></FontAwesomeIcon>
              <div className='custum-text-authors'>
                <strong>76</strong>
                <br />
                Total Students
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className='border mt-1 custum-card' bg='white'>
          <Card.Body>
            <div>
              <FontAwesomeIcon
                className='fa-readmes'
                size='2xl'
                icon={faBookReader}
              ></FontAwesomeIcon>
              <div className='custum-text-authors'>
                <strong>12</strong>
                <br />
                Pending task
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className='border mt-1 mx-auto custum-card' bg='white'>
          <Card.Body>
            <div>
              <FontAwesomeIcon
                className='fa-BookPages'
                size='2xl'
                icon={faFile}
              ></FontAwesomeIcon>
              <div className='custum-text-authors'>
                <strong>230361</strong>
                <br />
                Books Read
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default GroupCardProgress
