import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./style.css";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import WizardTemplate from "../WizardTemplete/WizardTemplate";

export const WizardInformation = (props) => {
  const [classBook, setClassBook] = useState("Select");
  const [option1, setOption1] = useState("History");
  const [option2, setOption2] = useState("Math");
  const [option3, setOption3] = useState("Science");

  return (
    <>
      <Row>
        <div className="container1-book-style">
          <Form.Label className="h7">Import Book Cover</Form.Label>
          <div className="container-book-cover"></div>
          <div className="container-form">
            <Form.Label>Name of Book</Form.Label>
            <Form.Control
              type="text"
              id="nameOfBook"
              placeholder="Enter the name of book"
              onChange={(ev) => props.fnNameOfBook(ev.target.value)}
            />
            <div className="footer">
              <Row>
                <Col>
                  <h6 className="d-flex justify-content-start">Class</h6>
                </Col>
                <Col>
                  <h6 className="d-flex justify-content-end">Pages</h6>
                </Col>
              </Row>
              <div>
                <Row>
                  <Col>
                    <Dropdown className="d-flex justify-content-start">
                      <Dropdown.Toggle
                        className="style-dropdown"
                        variant="outline-white"
                        id="dropdown-autoclose-true"
                      >
                        {classBook}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          href="#"
                          onClick={(HandleClass) => {
                            setClassBook(option1);
                            props.fnClassOfBook(option1);
                          }}
                        >
                          {option1}
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#"
                          onClick={(HandleClass) => {
                            setClassBook(option2);
                            props.fnClassOfBook(option2);
                          }}
                        >
                          {option2}
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#"
                          onClick={(HandleClass) => {
                            setClassBook(option3);
                            props.fnClassOfBook(option3);
                          }}
                        >
                          {option3}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                  <Col>
                    <input
                      className="pagination-style d-flex justify-content-end"
                      id={"bookPages"}
                      type="number"
                      min={1}
                      max={99}
                      step={1}
                      onChange={(ev) => props.fnNumberOfPages(ev.target.value)}
                    />
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>

        <div className="main-container-book-style">
          <div className="style-title">Select Book Style</div>
          <Swiper
            modules={[Navigation]}
            slidesPerView={6}
            spaceBetween={20}
            navigation
            loop={true}
          >
            {setLargeBookCardsData()}
          </Swiper>
        </div>
      </Row>
    </>
  );
};

// ============== Carrousel puede se un componente ================
export const setLargeBookCardsData = () => {
  const booksList = [];
  const count = 0;
  if (12 > 0) {
    for (let i = 0; i < 12; i++) {
      booksList.push(
        <SwiperSlide key={i}>
          <Row>
            <Col className="style-template">
              <WizardTemplate name={"Template"}></WizardTemplate>
            </Col>
          </Row>
          <Row>
            <Col className="style-template">
              <WizardTemplate name={"Template"}></WizardTemplate>
            </Col>
          </Row>
        </SwiperSlide>
      );
    }
  }

  return booksList;
};
