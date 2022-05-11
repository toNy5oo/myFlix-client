import React from 'react'
import { Navbar, Nav, Container, NavDropdown  } from 'react-bootstrap';

export function Menubar({user}){

    const onLoggedOut = () => {
        localStorage.clear();
        window.open('/', '_self');
      }

      const isAuth = () => {

        if (typeof window == 'undefined') {
            return false;
        }
        if (localStorage.getItem('token')){
            return localStorage.getItem('token');
        } else {
            return false;
        }
      };
    
    return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto">
        {isAuth() && (  
        <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>
        )}
        <Nav.Link href="#pricing">Pricing</Nav.Link>
        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Nav>
        <Nav.Link href="#deets">More deets</Nav.Link>
        <Nav.Link eventKey={2} href="#memes">
          Dank memes
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
    </Container>
  </Navbar>
    );
}

