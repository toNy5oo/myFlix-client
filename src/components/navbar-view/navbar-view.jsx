import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import './navbar.css'

export function NavbarView() {
  let user = localStorage.getItem("user");

  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
      <>
    <Navbar collapseOnSelect expand="lg" bg="alert" variant="dark">
		<Container>
		<Navbar.Brand href="#home">MyFlix</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					
					<Nav className="mx-auto">
										<Link to="/">
												<Nav.Link href="#api">Movies</Nav.Link>
										</Link>
										<Link to="/profile">
												<Nav.Link href="#portfolio">Profile</Nav.Link>
										</Link>
										<Link to="/favourites">
											<Nav.Link href="#favourites">Favourites</Nav.Link>
										</Link>
					</Nav>
					
					<Nav className="mx-auto">
										{
										isAuth() && 
										(<Nav.Link href="#test" onClick={() => onLoggedOut()}>
											Logout
										</Nav.Link>)
										}
										<Nav.Link href="#test" disabled variant="secondary">
											{user}
										</Nav.Link>
					</Nav>

				</Navbar.Collapse>
		</Container>
	</Navbar>
   </>
)
}
