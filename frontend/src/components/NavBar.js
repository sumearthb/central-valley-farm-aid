import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavBar() {
  return (
    <Navbar style={{ backgroundColor: '#69A765'}}>
      <Container>
        <Navbar.Brand>
          <Link style={{ color: "inherit", textDecoration: "inherit" }} 
            to="/">
            Central Valley Farm Aid
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link>
              <Link style={{ color: "inherit", textDecoration: "inherit" }}
                to="/">
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link style={{ color: "inherit", textDecoration: "inherit" }}
                to="/about">
                About
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link style={{ color: "inherit", textDecoration: "inherit" }}
                to="/locations">
                Locations
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link style={{ color: "inherit", textDecoration: "inherit" }}
                to="/nonprofits">
                Nonprofits
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link style={{ color: "inherit", textDecoration: "inherit" }}
                to="/farmersmarkets">
                Farmers' Markets
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
