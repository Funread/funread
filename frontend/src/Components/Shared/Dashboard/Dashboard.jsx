import React from 'react'
import "./Dashboard.css"
import {Carousel, Col, Row, Button}from "react-bootstrap"
import Container from 'react-bootstrap/Container';
import HeaderDashboard from '../HeaderDashboard/HeaderDashboard';

function Dashboard(props) {
  return (
    <Container fluid>
      <div className="dashboard-header">
        <HeaderDashboard/> 
      </div>
        <Row>
          <Col md='8'>
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://www.solidbackgrounds.com/images/2560x1600/2560x1600-orange-color-wheel-solid-color-background.jpg"
                  alt="First slide"
                />
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://www.solidbackgrounds.com/images/2560x1600/2560x1600-palatinate-blue-solid-color-background.jpg"
                  alt="Second slide"
                />
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://www.solidbackgrounds.com/images/2560x1600/2560x1600-royal-purple-solid-color-background.jpg"
                  alt="Third slide"
                />
              </Carousel.Item>

            </Carousel>

            <Row className='btn-container'>
            <Button className='btn-dashboard' variant="primary" size="lg">
                My Library
            </Button>
            <Button className='btn-dashboard' variant="primary" size="lg">
                Shared Library
            </Button>
            <Button className='btn-dashboard' variant="primary" size="lg">
                My Groups
            </Button>
        </Row>

          </Col>

          <Col md='4'>
            <div className='calendar-container d-md-none d-lg-block'></div>
          </Col>
        </Row>

        
    </Container>
  );
}

Dashboard.propTypes = {}

export default Dashboard