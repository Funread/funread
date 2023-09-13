import './poc.css'
import MyBooks from '../Components/MyBooks/MyBooks'
import ShareLibrary from '../Components/ShareLibrary/ShareLibrary'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const POC = () => {
  return (
    <>
      <Navbar expand='lg' className='bg-body-tertiary'>
        <Container fluid>
          <Navbar.Brand >FUNREAD</Navbar.Brand>
          <Navbar.Toggle aria-controls='navbarScroll' />
          <Navbar.Collapse id='navbarScroll'>
            <div className="spacer"></div>
            <Form className='d-flex'>
              <Form.Control
                type='search'
                placeholder='Search'
                className='me-2'
                aria-label='Search'
              />
              <Button variant='outline-success'>
                <FontAwesomeIcon
                  className='fa-magnifying-glass'
                  icon={faSearch}
                />
              </Button>
            </Form>
            <Nav
              className='ms-auto my-2 my-lg-0'
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href='#action1'>Share Library</Nav.Link>
              <Nav.Link href='#action2'>Book</Nav.Link>
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className='container-fluid text-center section'>
        <div className='row content'>
          <div className='col-sm-9 text-rigth'>
            <h4>My Books</h4>
            <MyBooks></MyBooks>
            <h4>Share Library</h4>
             <ShareLibrary></ShareLibrary>
          </div>
          <div className='col-sm-3 sidenav'>
            <div className='well'>
              <p>Keep Reading</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default POC
