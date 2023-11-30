import HelpersCard from './HelpersCard'
import './Helpers.sass'
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
    id:0,
    imageUrl:undefined,
    name:"Oscar Arrieta",
    post:"Proyect Manager",
    linke: (
      <a href="https://www.linkedin.com/in/oscar-mario-a-b48aa8105/" target="_blank">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png"
          className="LogoLin"
        />
      </a>
    ),

  },
  {
    id:1,
    imageUrl:undefined,
    name:"Harold Espinoza Obando",
    lugar:"Estudiante Universidad de Costa Rica",
    post:"Desarrollador Backend",
    linke: (
      <a href="https://www.linkedin.com/in/haroldespinozaobando" target="_blank">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png"
          className="LogoLin"
        />
      </a>
    ),

  },

  {
    id: 2,
    imageUrl:undefined,
    name:"Anthony Gonzalez Solano",
    lugar:"Estudiante Universidad de Costa Rica",
    post:"Desarrollador Backend",
    linke:<a href="www.linkedin.com/in/anthony-gonzalez-s/" target="_blank"><img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png"
    className="LogoLin"
  /></a>
    
  },
  {
    id: 3,
    imageUrl:undefined,
    name:"Geovanni Gutiérrez",
    lugar:"Estudiante Universidad de Costa Rica",
    post:"Scrum Master y Desarrollador Backend",
    linke:<a href="https://www.linkedin.com/in/geovanni-gutierrez/" target="_blank"><img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png"
    className="LogoLin"
  /></a>
    
  },

  {
    id: 4,
    imageUrl:undefined,
    name:"Tifanny Alvarado Camacho",
    lugar:"Estudiante CTP Liberia",
    post:"Desarrolladora Backend",
    linke:<a href="https://www.linkedin.com/in/tifanny-alvarado-camacho-371b082a0/" target="_blank"><img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png"
    className="LogoLin"
  /></a>
    
  },
  
  {
    id: 5,
    imageUrl:undefined,
    name:"Brian Vargas Rivera",
    lugar:"Estudiante CTP Santa Lucia",
    post:"Desarrolladora Backend",
    linke:<a href="www.linkedin.com/in/brian-vargas-89b859270" target="_blank"><img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png"
    className="LogoLin"
  /></a>
 
  },
  
  {
    id: 6,
    imageUrl:undefined,
    name:"Aarón Morales Solano",
    lugar:"Estudiante CTP Santa Lucia",
    post:"Desarrolladora Backend",
    linke:<a href="https://www.linkedin.com/in/aar%C3%B3n-morales-solano-ab6b102a0/" target="_blank"><img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png"
    className="LogoLin"
  /></a>
 
  },
  {
    id:7,
    imageUrl:undefined,
    name:"José Ramírez Jiménez",
    lugar:"Estudiante CTP Santa Lucía",
    post:"Desarrollador Backend",
    linke:<a href="https://www.linkedin.com/in/jose-andres-ramírez-j-4b4926269" target="_blank"><img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png"
    className="LogoLin"
  /></a>
    ,

  },

  {
    id: 8,
    imageUrl:undefined,
    name:"Cristhian Betancourt",
    lugar:"Estudiante CTP Liberia",
    post:"Desarrollador Backend",
    linke:<a href="https://www.linkedin.com/in/cristhian-jossue-betancourt-orta-835b152a0" target="_blank"><img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png"
    className="LogoLin"
  /></a>
    
  },
  {
    id: 9,
    imageUrl:undefined,
    name:"Bryant Torres Mora",
    lugar:"Estudiante CTP Santa Lucía",
    post:"Desarrolladora Backend",
    linke:<a href="https://www.linkedin.com/in/bryant-torres-mora-a3bb042a0" target="_blank"><img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png"
    className="LogoLin"
  /></a>
    
  },
  
  {
    id: 10,
    imageUrl:undefined,
    name:"Génesis Gutiérrez",
    lugar:"Estudiante CTP Liberia",
    post:"Desarrolladora Backend",
    linke:<a href="https://www.linkedin.com/in/g%C3%A9nesis-guti%C3%A9rrez-9142a62a1/" target="_blank"><img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png"
    className="LogoLin"
  /></a>
 
  },
  {
    id: 11,
    imageUrl:undefined,
    name:"Doryan Jimenez",
    lugar:"Estudiante Universidad de Costa Rica",
    post:"Scrum Master y Desarrollador Frontend",
    linke:<a href="https://www.linkedin.com/in/doryan-jimenez-montero/" target="_blank"><img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png"
    className="LogoLin"
  /></a>
 
  },
  {
    id: 12,
    imageUrl:undefined,
    name:"Aracely Saenz Contreras",
    lugar:"Estudiante Universidad de Costa Rica",
    post:"Scrum Master y Desarrolladora Frontend",
    linke:<a href="https://www.linkedin.com/in/saenz-contreras/" target="_blank"><img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png"
    className="LogoLin"
  /></a>
 
  },
  {
    id: 13,
    imageUrl:undefined,
    name:"Paola Vega Vásquez",
    lugar:"Estudiante Universidad de Costa Rica",
    post:"Desarrolladora Frontend",
    linke:<a href="www.linkedin.com/in/paola-vega-324272245" target="_blank"><img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png"
    className="LogoLin"
  /></a>
 
  },
  {
    id: 14,
    imageUrl:undefined,
    name:"Héctor Acevedo Guerrero",
    lugar:"Estudiante Universidad de Costa Rica",
    post:"Desarrollador Frontend",
    linke:<img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png"
    className="LogoLin"/>,
  
  },
  {
    id: 15,
    imageUrl:undefined,
    name:"Jonathan Carballo",
    lugar:"Estudiante Universidad de Costa Rica",
    post:"Desarrollador Frontend",
    linke:<a href="https://www.linkedin.com/in/jonathan-carballo-357221288" target="_blank"><img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png"
    className="LogoLin"
  /></a>
  },
  {
    id: 17,
    imageUrl:undefined,
    name:"Ana Rosa Achí Sánchez",
    lugar:"Estudiante Universidad de Costa Rica",
    post:"Desarrolladora Frontend",
    linke:<a href="https://www.linkedin.com/in/ani-achí-22537921b" target="_blank"><img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png"
    className="LogoLin"
  /></a>
  },
  {
    id: 18,
    imageUrl:undefined,
    name:"Jonathan Barrantes",
    lugar:"Estudiante Universidad Invenio",
    post:"Desarrollador Frontend",
    linke:<a href="https://www.linkedin.com/in/jonathan-barrantes-673596201?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank"><img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png"
    className="LogoLin"
  /></a>
  },
  
  {
    id:19,
    imageUrl:undefined,
    name:"Naomy Segura Quesada",
    lugar:"Estudiante CTP Santa Lucía",
    post:"Desarrolladora Frontend",
    linke:<a href="https://www.linkedin.com/in/naomy-segura-a872272a1" target="_blank"><img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png"
    className="LogoLin"
  /></a>
    ,

  },

  {
    id: 20,
    imageUrl:undefined,
    name:"Solangie Hernández",
    lugar:"Estudiante CTP Santa Lucía",
    post:"Desarrolladora Frontend",
    linke:<a href="http://www.linkedin.com/in/solangie-hernández-953b2a2a0" target="_blank"><img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png"
    className="LogoLin"
  /></a>
    
  },
  {
    id: 21,
    imageUrl:undefined,
    name:"Alison Calderón",
    lugar:"Estudiante CTP Santa Lucía",
    post:"Desarrolladora Frontend",
    linke:<a href="https://www.linkedin.com/in/tifanny-alvarado-camacho-371b082a0/" target="_blank"><img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png"
    className="LogoLin"
  /></a>
    
  },
  
  {
    id: 22,
    imageUrl:undefined,
    name:"Maverick Siles Corrales",
    lugar:"Estudiante CTP Santa Lucía",
    post:"Desarrollador Frontend",
    linke:<a href="www.linkedin.com/in/brian-vargas-89b859270" target="_blank"><img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png"
    className="LogoLin"
  /></a>
 
  },
  {
    id:23,
    imageUrl:undefined,
    name:"Cesiah Cordero Rojas",
    lugar:"Estudiante CTP Santa Lucía",
    post:"Desarrolladora Frontend",
    linke:<a href="https://www.linkedin.com/in/cesiah-cordero-49022a2a1" target="_blank"><img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png"
    className="LogoLin"
  /></a>
    ,

  },

  {
    id: 24,
    imageUrl:undefined,
    name:"Fabián Chaves Solano",
    lugar:"Estudiante CTP Santa Lucía",
    post:"Desarrollador Frontend",
    linke:<a href="www.linkedin.com/in/anthony-gonzalez-s/" target="_blank"><img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png"
    className="LogoLin"
  /></a>
    
  },
  {
    id: 25,
    imageUrl:undefined,
    name:"Karen Pérez Moreira",
    lugar:"Estudiante CTP Liberia",
    post:"Desarrolladora Frontend",
    linke:<a href="https://www.linkedin.com/in/karen-pérez-moreira-668b362a0" target="_blank"><img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png"
    className="LogoLin"
  /></a>
    
  },
  {
    id: 26,
    imageUrl:undefined,
    name:"Alejandro Rodriguez",
    lugar:"Estudiante Universidad de Costa Rica",
    post:"Software QA",
    linke:<a href="http://www.linkedin.com/in/alejandro-rodriguez-7906321a9" target="_blank"><img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png"
    className="LogoLin"
  /></a>
    
  },
  {
    id: 27,
    imageUrl:undefined,
    name:"Felipe Camacho Briceño",
    lugar:"Estudiante Universidad Latina de Costa Rica",
    post:"Software QA",
    linke:<a href="http://linkedin.com/in/felipe-camacho-briceño-532733b4" target="_blank"><img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png"
    className="LogoLin"
  /></a>
    
  },
  {
    id: 28,
    imageUrl:undefined,
    name:"Emmanuel Medrano",
    lugar:"Estudiante CTP Liberia",
    post:"Software QA",
    linke:<img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png"
    className="LogoLin"/>,
  
    
  },
  {
    id: 29,
    imageUrl:undefined,
    name:"Didier Aaron Mayorga",
    lugar:"Estudiante CTP Liberia",
    post:"Software QA",   
    linke:<img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png"
    className="LogoLin"/>,
  },
]


const Helpers = () => {
  return (
    <div className='helpers_main_container'>
        
        <Header />
      
      
       <div className="helpers_title-container">COLLABORATORS</div>
    
      
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