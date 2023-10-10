import ReactPlayer from "react-player";
// import "./DragAndDrop.css";
import { Card, Button, Nav } from "react-bootstrap";
import React from "react";
import WidgetVideoYou from "./WidgetVideoYou";
import WidgetVideo from "./WidgetVideo";

function Video() {
  return (
    <Card className=" card-text-Video text-center">
      <h1 className="custum-video-H1">
        <strong>Video Upload</strong>
      </h1>

      <Card
        className="custum-video text-center bg-light mx-auto border border-dark"
        style={{ width: "60%" }}
      >
        <Card.Header>
          <Nav>
            <Nav.Item>
              {/* <Button className="btn btn-dark">YouTube</Button> */}
            </Nav.Item>
            <Nav.Item>
              {/* <Button className="btn btn-dark">DeskTop</Button> */}
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          <Card.Title style={{ textAlign: "left" }}>YouTube</Card.Title>
          <Card.Text>
            <WidgetVideoYou></WidgetVideoYou>
            <Card.Title style={{ textAlign: "left" }}>Desktop</Card.Title>
            <WidgetVideo></WidgetVideo>
          </Card.Text>
        </Card.Body>
      </Card>
    </Card>
  );
}

export default Video;
