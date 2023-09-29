import "./StudentCard.css";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Accordion from "react-bootstrap/Accordion";

function studentCard({
  idStudent,
  idGroup,
  image,
  name,
  pendingTasks,
  completeTasks,
}) {
  return (
    <>
      <div className=" divstudentCard container mx-auto pt-5 text-white justify-content-center">
        <div className="profileImagen mx-auto">
          <Image
            src={image}
            width={180}
            height={180}
            alt="image"
            roundedCircle
          />
        </div>
        <div className="infoStudent">
          <h6>
            {name} <br />
            Group: {idGroup}
          </h6>
        </div>

        <Accordion className="custum-accordion">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Complete Tasks {completeTasks}</Accordion.Header>
            <Accordion.Body>tell me why</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Pending Tasks {pendingTasks}</Accordion.Header>
            <Accordion.Body>Aint nothing but a headache</Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <br />
      </div>
    </>
  );
}

export default studentCard;
