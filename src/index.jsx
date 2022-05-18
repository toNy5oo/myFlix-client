import React, {useState, useEffect} from 'react';
import { createRoot } from 'react-dom/client';
import { Container } from "react-bootstrap";
import { MainView } from "./components/main-view/main-view";

// Import statement to indicate that you need to bundle `./index.scss`
import './index.css';

// Main component (will eventually use all the others)
export default function MyFlixApplication() {
  
     return (
        <>
          <Container>
            <MainView />
          </Container>
        </>
    )
}

// Finds the root of your app
const container = document.getElementById('app');
const root = createRoot(container); 
// Tells React to render your app in the root DOM element
root.render(<MyFlixApplication tab="home" />);