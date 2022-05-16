import React, {useState, useEffect} from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router} from "react-router-dom";
import { MainView } from './components/main-view/main-view';
import { MovieView } from './components/movie-view/movie-view';
import { FavouritesView } from './components/favourite-view/favourite-view';
import { DirectorView } from './components/director-view/director-view';
import { GenreView } from './components/genre-view/genre-view';
import { ProfileView } from './components/profile-view/profile-view';
import { LoginView } from './components/login-view/login-view';
import { SharedView } from './components/shared-view/shared-view';
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";

// Import statement to indicate that you need to bundle `./index.scss`
import './index.css';

// Main component (will eventually use all the others)
export default function MyFlixApplication() {
  
  const [user, setUser] = useState(null);

        /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
        function onLoggedIn(authData) {
          console.log("OnLoggedIn...");
          console.log(authData);
          setUser(authData.user.Username)
          
          localStorage.setItem('token', authData.token);
          localStorage.setItem('user', authData.user.Username);
          //getMovies(authData.token);
        }

  useEffect(() => {
    let accessToken = localStorage.getItem('token');
      if (accessToken !== null) {
        setUser(localStorage.getItem('user'));
      }
    },[])
  
    return (
        <>
           <Router>
              <Routes>
                    {/*If user exists then Home, otherwise Login form*/}
                    <Route path="/" element={<SharedView />}> 
                        <Route index element={(user) ? (<MainView user={user}/>) : (<LoginView onLoggedIn={user => onLoggedIn(user)} />)}/>
                        <Route path="profile" element={<ProfileView />} />
                        <Route path="favourites" element={<FavouritesView />} />
                        <Route path="movies/:movie_id" element={<MovieView />} /> 
                        <Route path="directors/:director_id" element={<DirectorView />} />
                        <Route path="genres/:genre_id" element={<GenreView />} />
                    </Route>
              </Routes>
            </Router>  
        </>
    )
}

// Finds the root of your app
const container = document.getElementById('app-container');
// Tells React to render your app in the root DOM element
const root = createRoot(container);
root.render(React.createElement(MyFlixApplication));