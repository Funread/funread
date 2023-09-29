import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  faBook,
  faBookReader,
  faFile,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import "./GroupCardProgress.css";

function GroupCardProgress() {
  return (
    <Row xs={1} md={4} className="bg-4 mt-4">
      <Col>
        <Card className="border border-primary" bg="white">
          <Card.Body>
            <Card.Text className="d-flex">
              <FontAwesomeIcon
                className="fa-bookss"
                size="2xl"
                icon={faBook}
              ></FontAwesomeIcon>
              <Card.Text className="custum-text-authors">
                <strong>13</strong>
                <br />
                <h10>Complete Task</h10>
              </Card.Text>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className="border border-info" bg="white">
          <Card.Body>
            <Card.Text className="d-flex">
              <FontAwesomeIcon
                className="fa-user"
                size="2xl"
                icon={faUser}
              ></FontAwesomeIcon>
              <Card.Text className="custum-text-authors">
                <strong>76</strong>
                <br />
                <h10>Total Students</h10>
              </Card.Text>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className="border border-success" bg="white">
          <Card.Body>
            <Card.Text className="d-flex">
              <FontAwesomeIcon
                className="fa-readmes"
                size="2xl"
                icon={faBookReader}
              ></FontAwesomeIcon>
              <Card.Text className="custum-text-authors">
                <strong>12</strong>
                <br />
                <h10>Pending task</h10>
              </Card.Text>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className="border border-warning" bg="white">
          <Card.Body>
            <Card.Text className="d-flex">
              <FontAwesomeIcon
                className="fa-BookPages"
                size="2xl"
                icon={faFile}
              ></FontAwesomeIcon>
              <Card.Text className="custum-text-authors">
                <strong>230361</strong>
                <br />
                <h10>Books Read</h10>
              </Card.Text>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default GroupCardProgress;
