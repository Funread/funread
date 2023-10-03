import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./CardNewGroup.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import React from "react";

function CardNewGroup() {
  return (
    <Card bg="light mt-4">
      <Card.Body>
        <Card.Title className="custum-title mb-4">Create New Group</Card.Title>
        <Card.Text className="custum-input-1">
          <InputGroup className="  mb-3 ">
            <InputGroup.Text>Grade: </InputGroup.Text>
            <Form.Control placeholder="enter grade" aria-label="Grade" />
          </InputGroup>
        </Card.Text>
        <Card.Text className="custum-input-2">
          <InputGroup className="mb-3">
            <InputGroup.Text>Subject Class: </InputGroup.Text>
            <Form.Control
              placeholder="enter Subject class"
              aria-label="Grade"
            />
          </InputGroup>
        </Card.Text>
        <Card.Text className="custum-input-3">
          <InputGroup className="mb-3">
            <InputGroup.Text>Students: </InputGroup.Text>
            <Form.Control placeholder="enter Students" aria-label="Grade" />
          </InputGroup>
        </Card.Text>
        <Button style={{ float: "right" }}>Create</Button>
      </Card.Body>
    </Card>
  );
}

export default CardNewGroup;
{
  /* <Form className="d-flex-1 py-3">
          <FormLabel style={{ textAlign: "left", marginLeft: "1rem" }}>
            Grade:
          </FormLabel>
          <Form.Control type="Grade" placeholder="Enter Grade" />
          <Card.Text > 
           Grade: <Input className="custum-inuput-1" type="text"></Input> 
           </Card.Text>

        </Form> */
}

{
  /* <Card.Text style={{ textAlign: "left", marginLeft: "1rem" }}>
            Subject Class:
            <FormControl className="me-1"></FormControl>
          </Card.Text> */
}

{
  /* <Card.Text style={{ textAlign: "left", marginLeft: "1rem" }}>
            Students:
          </Card.Text> */
}
