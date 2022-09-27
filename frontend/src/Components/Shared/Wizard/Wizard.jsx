import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import "./Wizard.css"
import {FontAwesomeIcon}from '@fortawesome/react-fontawesome';
// import {} from '"@fortawesome/free-regular-svg-icons"'
import { faXmark, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import Modal from 'react-bootstrap/Modal';

const ContainerWz = ({children}) =>{
    const [modalShow, setModalShow] = React.useState(false);
    const [activePage, setActivePage] = React.useState(0)
    const pages = React.Children.toArray(children)
    const currentPage = pages[activePage]
    

    const BtnBackClick = () => {
        setActivePage(index => index - 1)
    }

    const BtnContinueClick = () =>{
        setActivePage(index => index + 1)
    }
    return (
        <> 
        <Button variant="primary" onClick={() => setModalShow(true)}>
            Launch vertically centered modal
        </Button>
        <Modal
        // {...props}
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >

    
            <div className='d-flex flex-row-reverse bd-highlight buttons-container'>
                <Row>
                    <Col>
                        {activePage > 0 ? (
                            <button className='btn-left' type="button"  onClick={BtnBackClick}>
                                <FontAwesomeIcon className='icons-wizard-left' icon={faAngleLeft}/>
                               Back
                            </button>
                        ):null}
                    </Col>
                        
                    <Col>
                        {activePage < pages.length -1 ? (
                            <button className="btn-right" type="button" onClick={BtnContinueClick}>
                                Continue
                                <FontAwesomeIcon className='icons-wizard-right' icon={faAngleRight}/>
                            </button>
                        ):null}  

                        {activePage === pages.length -1 ? (
                            <button className='btn-right' type="submit" >
                                Save Book
                                <FontAwesomeIcon className='icons-wizard-right' icon={faAngleRight}/>
                            </button>
                        ):null}
                    </Col>
                    <Col>
                        {activePage < pages.length ? (
                            <button className="btn-right" type="button" onClick={() => setModalShow(false)}>
                                Close
                                <FontAwesomeIcon className='icons-wizard-right' icon={faXmark} />
                            </button>
                        ):null}  
                    </Col>
                </Row>
            </div>
            

            <div className='d-flex flex-row bd-highlight mb-3 wizard-bg'>
                <div>
                    {currentPage}
                </div>

                    
            </div>
        </Modal>
        </>
    )
}

const Page1 = () => <h1>Page 1</h1>
const Page2 = () => <h1>Page 2</h1>
const Page3 = () => <h1>Page 3</h1>

export default function Wizard() {
  return (
    <ContainerWz>
        <Page1/>
        <Page2/>
        <Page3/>
    </ContainerWz>
  );
}


