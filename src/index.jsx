import React, {useState, useEffect} from 'react';
import { createRoot } from 'react-dom/client';
import { Container } from "react-bootstrap";
import { MainView } from "./components/main-view/main-view";

//Redux
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import store from './redux/store'

import './index.css';

// Main component (will eventually use all the others)
export default function MyFlixApplication() {

     return (
        <>
        <Provider store={store}>
          <Container id="container">
            <MainView />
          </Container>
        </Provider>
        </>
    )
}

// Finds the root of your app
const container = document.getElementById('app');
const root = createRoot(container); 
// Tells React to render your app in the root DOM element
root.render(<MyFlixApplication tab="home" />);