import React, {useState, useEffect} from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router} from "react-router-dom";
import { Home } from './components/home-view/home-view';
import { SingleMovie } from './components/movie-view/movie-view';
import { Favourites } from './components/favourite-view/favourite-view';
import { Director } from './components/director-view/director-view';
import { Genre } from './components/genre-view/genre-view';
import { Profile } from './components/profile-view/profile-view';
import { Login } from './components/login-view/login-view';
import { SharedLayout } from './components/shared-view/shared-view';
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

        // /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
        // function onLoggedIn(authData) {
        //   console.log("OnLoggedIn...");
        //   console.log(authData);
        //   setUser(authData.user.Username)
          
        //   localStorage.setItem('token', authData.token);
        //   localStorage.setItem('user', authData.user.Username);
        //   //getMovies(authData.token);
        // }

  useEffect(() => {
    let accessToken = localStorage.getItem('token');
      if (accessToken !== null) {
        setUser(localStorage.getItem('user'));
      }
    },[])
  
    return (
        // 
        <div>
           <Router>
              <Routes>
                    {/*If user exists then Home, otherwise Login form*/}
                    <Route path="/" element={<SharedLayout />}> 
                        <Route index element={(user) ? <Home /> : <Login />} />  
                        <Route path="movies/:movie_id" element={<SingleMovie />} />  
                        <Route path="favourites" element={<Favourites />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="directors/:director_id" element={<Director />} />
                        <Route path="genres/:genre_id" element={<Genre />} />
                    </Route>

              </Routes>
            </Router>  
        </div>
        // </Router>
    )
}

// Finds the root of your app
const container = document.getElementById('app-container');
// Tells React to render your app in the root DOM element
const root = createRoot(container);
root.render(React.createElement(MyFlixApplication));