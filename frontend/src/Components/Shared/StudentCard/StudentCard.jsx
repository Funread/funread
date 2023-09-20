import './StudentCard.css'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';


function studentCard() {
  return (
    <>
    <div className='div'>
        <div className='profileImagen'>
        
            <Image src={"https://i.pinimg.com/564x/97/91/d7/9791d7260dee3f14f37f1e2913e659bb.jpg"} roundedCircle />
        
        </div>
        <div className='infoStudent'>

            <h6>Hector Acevedo Guerrero <br/>
            Grupo 3

            </h6>
            


        
        </div>

        <div className='accordionBar'>
        <Accordion>
        <Accordion.Item eventKey="0">
            <Accordion.Header>Tareas completas</Accordion.Header>
            <Accordion.Body>
            tell me why
            </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
            <Accordion.Header>Tareas faltantes</Accordion.Header>
            <Accordion.Body>
            Aint nothing but a headache
            </Accordion.Body>
        </Accordion.Item>
        </Accordion>


        </div>
    </div>
    </>
  );
}

export default studentCard;