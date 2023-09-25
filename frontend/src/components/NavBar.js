import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
          <Form className="d-flex justify-content-end">
            <Form.Control type="search" id="searchText" placeholder="Search..." 
                className="mx-2" aria-label="Search"></Form.Control>
            <Button type="submit" variant="dark">Search</Button>
          </Form>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
