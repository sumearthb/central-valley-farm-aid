import "../styles/NavBar.css";
import React from "react";
import { Link } from "react-router-dom";
import {Container, Nav, Navbar, Form, Button} from "react-bootstrap";

function NavBar() {
  return (
    <Navbar expand="lg" className="navbar">
      <Container>
        <Navbar.Brand>
          <Link className="navbar-link"
            to="/">
            Central Valley Farm Aid
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">
              Home
            </Nav.Link>
            <Nav.Link href="/about">
              About
            </Nav.Link>
            <Nav.Link href="/locations">
              Locations
            </Nav.Link>
            <Nav.Link href="/nonprofits">
              Nonprofits
            </Nav.Link>
            <Nav.Link href="/farmersmarkets">
              Farmers' Markets
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
