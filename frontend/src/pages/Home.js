import "../styles/Home.css";
import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

function Home() {
  return (
    <>
      {/* Adding home page photo */}
      <div className="background">
        <h1 className="background-text">Welcome to Central Valley Farm Aid!</h1>
      </div>

      {/* Cards for the three models */}
        <Container className="home-container">
          <Card className="model-card">
            <Card.Body className="model-card-body">
              <Card.Title className="fs-4">
                Locations
              </Card.Title>
            <Card.Text className="fs-5">
                Explore information about the counties of the Central Valley.
              </Card.Text>
              <Link to="/locations">
                <Button variant="primary" style={{ backgroundColor: '#9E826B'}} className="border-white">
                  Search locations
                </Button>
              </Link>
            </Card.Body>
          </Card>
          <Card className="model-card">
            <Card.Body className="model-card-body">
              <Card.Title className="fs-4">
                Non-profit Organizations
                </Card.Title>
              <Card.Text className="fs-5">
                See what nonprofits are doing for local farmers.
              </Card.Text>
              <Link to="/nonprofits">
                <Button variant="primary" style={{ backgroundColor: '#9E826B'}} className="border-white">
                  Search nonprofits
                </Button>
              </Link>
            </Card.Body>
          </Card>
          <Card className="model-card">
            <Card.Body className="model-card-body">
              <Card.Title className="fs-4">
                Farmers' Markets
              </Card.Title>
              <Card.Text className="fs-5">
                Find out more about Farmers' Markets near you!
              </Card.Text>
              <Link to="/farmersmarkets">
                <Button variant="primary" style={{ backgroundColor: '#9E826B'}} className="border-white">
                  Search farmers' markets
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Container>
    </>
  );
}

export default Home;