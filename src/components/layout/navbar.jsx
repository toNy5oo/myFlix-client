import React, {useEffect, useState} from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import '../styles/navbar.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Router,
  Link,
  Outlet,
  useParams,
  Redirect,
  useNavigate
} from "react-router-dom";

export function Navbar({user}){

	let localUser = null;

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

	  useEffect(() => {
		  localUser = localStorage.getItem('user')
	  })
    

    return (

		// <div className="test">
		// 	<Link to="/">Home</Link>
		// 	<Link to="/movies">Movies</Link>
		// 	<Link to="/movie/:movieId"></Link>
		// 	<Link to="/featured">Featured</Link>
		// </div>

    <Navbar collapseOnSelect expand="lg" bg="alert" variant="dark">
    <Container>
    <Navbar.Brand href="#home">MyFlix</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="d-flex mx-auto">
        <Link to="/">
            <Nav.Link href="#api">Movies</Nav.Link>
        </Link>
        <Link to="/profile">
            <Nav.Link href="#portfolio">Profile</Nav.Link>
        </Link>
		<Link to="/featured">
        	<Nav.Link href="#featured">Featured</Nav.Link>
		</Link>
      </Nav>
      
      <Nav>
      
      {
      isAuth() 
      && 
      (<Nav.Link href="#test" onClick={() => onLoggedOut()}>Logout</Nav.Link>)
      }
	  <Nav.Link href="#test">{localUser}</Nav.Link>
      </Nav>
    </Navbar.Collapse>
    </Container>
  </Navbar>
    );
}

