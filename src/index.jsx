import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import { MovieView } from './components/movie-view/movie-view';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


// Import statement to indicate that you need to bundle `./index.scss`
import './index.css';

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Container fluid>
        <Navbar>
          <Navbar.Brand href="#home" className="logo_navbar">MyFlix</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Signed in as: <a href="#login">Mark Otto</a>
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar>
        
        
        <MainView />
      
      
      </Container>
    );
  }
}

// Finds the root of your app
const container = document.getElementById('app-container');

// Tells React to render your app in the root DOM element
createRoot(container).render(React.createElement(MyFlixApplication));