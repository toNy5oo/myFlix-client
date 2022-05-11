import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import { MovieView } from './components/movie-view/movie-view';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.css';

// Main component (will eventually use all the others)
export default function MyFlixApplication() {
  
  const [user, setUser] = useState('');

  useEffect(() => {
    let accessToken = localStorage.getItem('token');
      if (accessToken !== null) {
        setUser(localStorage.getItem('user'));
      }
    },[])
  
    return (      
        <MainView />
    )
}

// Finds the root of your app
const container = document.getElementById('app-container');

// Tells React to render your app in the root DOM element
createRoot(container).render(React.createElement(MyFlixApplication));