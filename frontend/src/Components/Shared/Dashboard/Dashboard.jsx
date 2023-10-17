import React from 'react'
import "./Dashboard.sass"
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
                  src={require('./image01.jpg')}
                  style={{ height: "480px", width: "50%" }}
                  alt="First slide"
                />
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={require('./image02.jpg')}
                  style={{ height: "480px", width: "50%" }}
                  alt="Second slide"
                />
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={require('./image03.jpg')}
                  style={{ height: "480px", width: "50%" }}
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
