import "./Video.css";
import { Card } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import React from "react";
import WidgetVideoYou from "./WidgetVideoYou";
import WidgetVideo from "./WidgetVideo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop } from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

function Video() {
  return (
    <div>
      <h1>
        <br />
        <br />
      </h1>
      <Tabs
        defaultActiveKey="YouTube"
        className="custum-tabs mx-auto border border-secondary"
        style={{ width: "60%" }}
      >
        <Tab
          className="custum-tab-youtube mx-auto"
          eventKey="YouTube"
          title="YouTube"
          style={{ width: "60%" }}
        >
          <Card className="custum-video text-center bg-light mx-auto border border-secondary">
            <Card.Header>
              <Card.Body>
                <Card.Title className="custum-icon-youtube">
                  <FontAwesomeIcon
                    className="custum-icon"
                    size="lg"
                    icon={faYoutube}
                    color="red"
                  />
                  <strong>YouTube</strong>
                </Card.Title>
                <Card.Text>
                  <WidgetVideoYou></WidgetVideoYou>
                </Card.Text>
              </Card.Body>
            </Card.Header>
          </Card>
        </Tab>
        <Tab
          className="mx-auto"
          eventKey="Desktop"
          title="Desktop"
          style={{ width: "60%" }}
        >
          <Card className="custum-video  bg-light mx-auto border border-secondary">
            <Card.Header>
              <Card.Body>
                <Card.Title className="custum-title-desktop">
                  {""}
                  <FontAwesomeIcon
                    className="custum-icon"
                    size="lg"
                    icon={faDesktop}
                  />
                  <strong>Desktop</strong>
                </Card.Title>
                <Card.Text>
                  <WidgetVideo></WidgetVideo>
                </Card.Text>
              </Card.Body>
            </Card.Header>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}

export default Video;
