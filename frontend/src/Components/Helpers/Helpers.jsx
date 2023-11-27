import HelpersCard from './HelpersCard'
import './Helpers.sass'
import colaboradores from './colaboradores.jpg'
import Header from '../Shared/Header/Header'
import logoFunread from "./../../logoFunread.png";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
const Helper = [


  {
    id:1,
    imageUrl:undefined,
    name:"Harold Espinoza Obando",
    lugar:"Estudiante Universidad de Costa Rica",
    post:"Desarrollador Backend",
    linke:<a href="https://www.linkedin.com/in/haroldespinozaobando" target="_blank">Perfil de LinkedIn</a>
    ,

  },

  {
    id: 2,
    imageUrl:undefined,
    name:"Anthony Gonzalez Solano",
    lugar:"Estudiante Universidad de Costa Rica",
    post:"Desarrollador Backend",
    linke:<a href="www.linkedin.com/in/anthony-gonzalez-s/" target="_blank">Perfil de LinkedIn</a>
    
  },
  {
    id: 3,
    imageUrl:undefined,
    name:"Tifanny Alvarado Camacho",
    lugar:"Estudiante CTP Liberia",
    post:"Desarrolladora Backend",
    linke:<a href="https://www.linkedin.com/in/tifanny-alvarado-camacho-371b082a0/" target="_blank">Perfil de LinkedIn</a>
    
  },
  
  {
    id: 4,
    imageUrl:undefined,
    name:"Brian Vargas Rivera",
    lugar:"Estudiante CTP Santa Lucia",
    post:"Desarrolladora Backend",
    linke:<a href="www.linkedin.com/in/brian-vargas-89b859270" target="_blank">Perfil de LinkedIn</a>
 
  },
  
  {
    id: 5,
    imageUrl:undefined,
    name:"Aarón Morales Solano",
    lugar:"Estudiante CTP Santa Lucia",
    post:"Desarrolladora Backend",
    linke:<a href="https://www.linkedin.com/in/aar%C3%B3n-morales-solano-ab6b102a0/" target="_blank">Perfil de LinkedIn</a>
 
  },
  {
    id:6,
    imageUrl:undefined,
    name:"José Ramírez Jiménez",
    lugar:"Estudiante CTP Santa Lucía",
    post:"Desarrollador Backend",
    linke:<a href="https://www.linkedin.com/in/jose-andres-ramírez-j-4b4926269" target="_blank">Perfil de LinkedIn</a>
    ,

  },

  {
    id: 7,
    imageUrl:undefined,
    name:"Cristhian Betancourt Orta ",
    lugar:"Estudiante CTP Liberia",
    post:"Desarrollador Backend",
    linke:<a href="https://www.linkedin.com/in/cristhian-jossue-betancourt-orta-835b152a0" target="_blank">Perfil de LinkedIn</a>
    
  },
  {
    id: 8,
    imageUrl:undefined,
    name:"Bryant Torres Mora",
    lugar:"Estudiante CTP Santa Lucía",
    post:"Desarrolladora Backend",
    linke:<a href="https://www.linkedin.com/in/bryant-torres-mora-a3bb042a0" target="_blank">Perfil de LinkedIn</a>
    
  },
  
  {
    id: 9,
    imageUrl:undefined,
    name:"Génesis Gutiérrez",
    lugar:"Estudiante CTP Liberia",
    post:"Desarrolladora Backend",
    linke:<a href="https://www.linkedin.com/in/g%C3%A9nesis-guti%C3%A9rrez-9142a62a1/" target="_blank">Perfil de LinkedIn</a>
 
  },
  
  {
    id:10,
    imageUrl:undefined,
    name:"Naomy Segura Quesada",
    lugar:"Estudiante CTP Santa Lucía",
    post:"Desarrolladora Frontend",
    linke:<a href="https://www.linkedin.com/in/naomy-segura-a872272a1" target="_blank">Perfil de LinkedIn</a>
    ,

  },

  {
    id: 11,
    imageUrl:undefined,
    name:"Solangie Hernández Brenes",
    lugar:"Estudiante CTP Santa Lucía",
    post:"Desarrolladora Frontend",
    linke:<a href="http://www.linkedin.com/in/solangie-hernández-953b2a2a0" target="_blank">Perfil de LinkedIn</a>
    
  },
  {
    id: 12,
    imageUrl:undefined,
    name:"Alison Calderón Monge",
    lugar:"Estudiante CTP Santa Lucía",
    post:"Desarrolladora Frontend",
    linke:<a href="https://www.linkedin.com/in/tifanny-alvarado-camacho-371b082a0/" target="_blank">Perfil de LinkedIn</a>
    
  },
  
  {
    id: 13,
    imageUrl:undefined,
    name:"Maverick Siles Corrales",
    lugar:"Estudiante CTP Santa Lucía",
    post:"Desarrollador Frontend",
    linke:<a href="www.linkedin.com/in/brian-vargas-89b859270" target="_blank">Perfil de LinkedIn</a>
 
  },
  {
    id:14,
    imageUrl:undefined,
    name:"Cesiah Cordero Rojas",
    lugar:"Estudiante CTP Santa Lucía",
    post:"Desarrolladora Frontend",
    linke:<a href="https://www.linkedin.com/in/cesiah-cordero-49022a2a1" target="_blank">Perfil de LinkedIn</a>
    ,

  },

  {
    id: 15,
    imageUrl:undefined,
    name:"Fabián Chaves Solano",
    lugar:"Estudiante CTP Santa Lucía",
    post:"Desarrollador Frontend",
    linke:<a href="www.linkedin.com/in/anthony-gonzalez-s/" target="_blank">Perfil de LinkedIn</a>
    
  },
  {
    id: 16,
    imageUrl:undefined,
    name:"Karen Pérez Moreira",
    lugar:"Estudiante CTP Liberia",
    post:"Desarrolladora Frontend",
    linke:<a href="https://www.linkedin.com/in/karen-pérez-moreira-668b362a0" target="_blank">Perfil de LinkedIn</a>
    
  },
]


const Helpers = () => {
  return (
    <div className='main_container'>
       <div className="header-navbar-container">
        <Navbar key='md' expand='md' className="bg-body-tertiary mb-3" bg="transparent" variant="dark">
          <Container fluid>
            <Navbar.Brand>
              <img
                src={logoFunread}
                alt="logo"
                className="header-navbar-logo-funread"
              ></img>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
            <Navbar.Offcanvas id={`offcanvasNavbar-expand-md`} className='loading-page-header' aria-labelledby={`offcanvasNavbarLabel-expand-md`} placement="end">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                  Opciones {/* Quizas se deba escojer un mejor nombre para el menu o quitarle el titulo */}
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/about">About Us</Nav.Link>
                  <Nav.Link href="#action2">Study Programs</Nav.Link>
                  <Nav.Link href="#action3">Recent Reports</Nav.Link>
                  <Nav.Link href="/">Log In</Nav.Link>
                  <Nav.Link href="#action5">Collaborators</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </div>
      <div className='backgroundContainer'>
        <img src={colaboradores} alt="Colaboradores" style={{ width: '100%', height: '110', position: 'absolute', zIndex: '-1' }} />
        <div className="title-container">COLLABORATORS</div>
      </div>
      
      
    <div className='section_helpers'>

      {/* Mapeo de cards */}
      {Helper.map(({ id, imageUrl, photo, name, post, lugar, linke }) => (
        <div key={id} className='item_helpers'>
          <HelpersCard
            id={id}
            imageUrl={imageUrl}
            photo={photo}
            name={name}
            post={post}
            lugar={lugar}
            linke={linke}
          />
        </div>
      ))}
    </div>
    </div>
  );
};

export default Helpers;