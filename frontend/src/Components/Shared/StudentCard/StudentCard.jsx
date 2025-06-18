import './StudentCard.sass'
import Image from 'react-bootstrap/Image'
import Accordion from 'react-bootstrap/Accordion'

function studentCard({ idStudent, idGroup, name, lastname }) {
  return (
    <>
      <div className=' divstudentCard container mx-auto pt-5 text-white justify-content-center'>
        <div className='profileImagen mx-auto w-50'>
          <Image
            src={'/imagenes/no-image.png'}
            width={180}
            height={180}
            alt='image'
            roundedCircle
          />
        </div>
        <div className='infoStudent'>
          <h6>
            {name + ' ' + lastname} <br />
            Group: {idGroup}
          </h6>
        </div>

        <Accordion className='custum-accordion'>
          <Accordion.Item eventKey='0'>
            <Accordion.Header>Complete Tasks</Accordion.Header>
            <Accordion.Body>tell me why</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey='1'>
            <Accordion.Header>Pending Tasks</Accordion.Header>
            <Accordion.Body>Aint nothing but a headache</Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <br />
      </div>
    </>
  )
}

export default studentCard
