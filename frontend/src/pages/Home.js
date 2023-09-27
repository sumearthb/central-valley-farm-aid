import "../styles/Home.css";
import React from "react";
//import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/Home.css";


function Home() {
    return (
    <>
      {/* Adding home page photo */}
      <div className="image">
        <h1 className="image-text">Welcome to Central Valley Farm Aid!</h1>
      </div>

      {/* Cards for the three models */}
      <Container className="container text-center">
        <Row className="my-4">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="fs-4">
                  Locations
                </Card.Title>
                <Card.Text className="fs-5">
                  Explore information about the counties of the Central Valley.
                </Card.Text>
                <Button variant="primary">
                  Search locations
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="fs-4">
                  Non-profit Organizations
                </Card.Title>
                <Card.Text className="fs-5">
                  See what nonprofits are doing for local farmers.
                </Card.Text>
                <Button variant="primary">
                  Search nonprofits
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="fs-4">
                  Farmers' Markets
                </Card.Title>
                <Card.Text className="fs-5">
                  Find out more about Farmers' Markets near you!
                </Card.Text>
                <Button variant="primary">
                  Search farmers' markets
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;