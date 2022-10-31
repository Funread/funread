import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap';
import "./WizardParte1.css";
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import {FontAwesomeIcon}from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";

import Card from "react-bootstrap/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import logo from "../../placeholderBook.jpg";
function WizardParte1(props) {
  const [page, setPage]= useState(1);
  const [nameBook, setNameBook]= useState("Select");
  const [option1, setOption1] = useState("History");
  const [option2, setOption2] = useState("Math");
  const [option3, setOption3] = useState("Science");

  const MorePages = () => {
    setPage((page) => page + 1);
  };
  const LessPages = () => {
    if (page === 1){
      return page;
    } else {
      setPage((page) => page - 1);
    }
  };

  const booksList = [
    {type: "Template 1"},
    {type: "Template 2"},
    {type: "Template 3"},
    {type: "Template 4"},
    {type: "Template 5"},
    {type: "Template 6"},
    {type: "Template 7"},
    {type: "Template 8"},
    {type: "Template 9"},
    {type: "Template 10"},
    {type: "Template 11"},
    {type: "Template 12"},
    {type: "Template 13"},
    {type: "Template 14"},
  ];
 
  function setLargeBookCardsData(data) {
    const booksList = [];

    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        booksList.push(
          <SwiperSlide key={i}>
            <Card className="large-book-card" key={i}>
              <Card.Img variant="top" src={logo} alt={logo} height="80%" />
              <Card.Body className="large-book-card-body">
                <Card.Title className="large-book-card-title">
                  {data[i].name}
                </Card.Title>
              </Card.Body>
              <Card.Text className="large-book-card-description">
                {data[i].type}
              </Card.Text>
            </Card>
          </SwiperSlide>
        );
      }
    }

    return booksList;
  }

  

  return (
    <>
        <Row>
            <div className='container1-book-style'>
                <Form.Label className='h7' >Import Book Cover</Form.Label>
                <div className='container-book-cover'>
                
                </div>
                <div className='container-form'>
                <Form.Label>Name of Book</Form.Label>
                <Form.Control
                    type="text"
                    id="inputTest"
                />
                <div className='footer'>
                  <Row>
                    <Col>
                      <h6 className='d-flex justify-content-start'>Class</h6> 
                    </Col>
                    <Col>
                      <h6 className='d-flex justify-content-end'>Pages</h6>
                    </Col>
                  </Row>
                  <div>
                    <Row>
                      <Col>
                        <Dropdown className='d-flex justify-content-start'>
                          <Dropdown.Toggle className='style-dropdown' variant="success" id="dropdown-autoclose-true">
                            {nameBook}
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item href="#" onClick={HandleClass=> setNameBook(option1)}>{option1}</Dropdown.Item>
                            <Dropdown.Item href="#" onClick={HandleClass=> setNameBook(option2)}>{option2}</Dropdown.Item>
                            <Dropdown.Item href="#" onClick={HandleClass=> setNameBook(option3)}>{option3}</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </Col>
                      <Col>
                        <Form.Label className='pagination-style d-flex justify-content-end'>
                          <Col>
                            {page}                    
                          </Col>
                          <Col>
                            <Row className='wizard-row-style'>
                              <FontAwesomeIcon className='angle-up-style' icon={faAngleUp} onClick={MorePages} />

                            </Row>
                            <Row className='wizard-row-style'>
                              <FontAwesomeIcon className='angle-down-style' icon={faAngleDown} onClick={LessPages} />
                              
                            </Row>
                          </Col>
                        </Form.Label>
                        
                      </Col>

                    </Row>
                    
                  </div>
                </div>

                </div>
            </div>

            <div className='main-container-book-style'>
            <Swiper
              modules={[Navigation]}
              slidesPerView={4}
              spaceBetween={20}
              navigation
              loop={true}
            >
              {setLargeBookCardsData(booksList)}
            </Swiper>
            </div>

        </Row>
    </>
  )
}

WizardParte1.propTypes = {}

export default WizardParte1;
