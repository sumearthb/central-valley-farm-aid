import "../styles/Home.css";
import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/Home.css";


function Home() {
  return (
    <>
      {/* Adding home page photo */}
      <div className="background">
        <h1 className="background-text">Welcome to Central Valley Farm Aid!</h1>
      </div>

      {/* Cards for the three models */}
      <div>
        <Container className="container text-center">
          <Row className="my-4">
            <Col>
              <Card style={{ backgroundColor: '#69A765'}}>
                <Card.Body>
                  <Card.Title className="fs-4">
                    Locations
                  </Card.Title>
                <Card.Text className="fs-5">
                    Explore information about the counties of the Central Valley.
                  </Card.Text>
                  <Link style={{ color: "inherit", textDecoration: "inherit" }} to="/locations">
                    <Button variant="primary" style={{ backgroundColor: '#9E826B'}} className="border-white">
                      Search locations
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ backgroundColor: '#69A765'}}>
                <Card.Body>
                  <Card.Title className="fs-4">
                    Non-profit Organizations
                    </Card.Title>
                  <Card.Text className="fs-5">
                    See what nonprofits are doing for local farmers.
                  </Card.Text>
                  <Link style={{ color: "inherit", textDecoration: "inherit" }} to="/nonprofits">
                    <Button variant="primary" style={{ backgroundColor: '#9E826B'}} className="border-white">
                      Search nonprofits
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ backgroundColor: '#69A765'}}>
                <Card.Body>
                  <Card.Title className="fs-4">
                    Farmers' Markets
                  </Card.Title>
                  <Card.Text className="fs-5">
                    Find out more about Farmers' Markets near you!
                  </Card.Text>
                  <Link style={{ color: "inherit", textDecoration: "inherit" }} to="/farmersmarkets">
                    <Button variant="primary" style={{ backgroundColor: '#9E826B'}} className="border-white">
                      Search farmers' markets
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Home;