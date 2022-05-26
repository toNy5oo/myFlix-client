import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { BrowserRouter as Router} from "react-router-dom";
import { MainView } from '../main-view/main-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { LoginView } from '../login-view/login-view';
import { RegisterView } from '../register-view/register-view';
import { NavbarView } from '../navbar-view/navbar-view';
import MoviesList from '../movies-list/movies-list'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Row, Col, Spinner } from 'react-bootstrap/';

//Redux
import { setMovies } from "../../redux/movieSlice";
import { connect, useDispatcher } from "react-redux";
import { store } from "../../redux/store"

export function MainView(props) {

    const [user, setUser] = useState(props.user);
    const [loading, setLoading] = useState(true);
		const [error, setError] = useState();

    useEffect(() => {
      let accessToken = localStorage.getItem('token');
      if (accessToken !== null) {
          setUser(localStorage.getItem('user'));
        }
      getMovies(accessToken);
      },[user])

       /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
       function onLoggedIn(authData) {
        console.log("OnLoggedIn...");
        setUser(authData.user.Username)
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        setLoading(false)
      }
 
    //fetch movies from API
    async function getMovies(token) {
         const response =  await axios.get('https://my-flix-cf.herokuapp.com/movies', {
         headers: { Authorization: `Bearer ${token}`}
        })
        store.dispatch(setMovies(response.data));
        //console.log(movies);
        setLoading(false);
      }

   //If data is not fetched, show spinner
		if ((user) && (loading)) {
			return <Row className="justify-content-center my-5">
						<div className="h3 text-muted text-center">Loading Movies...
							&nbsp;<Spinner animation="border" variant="secondary" role="status" />
						</div>
					</Row>		
		 }

		if (error) {
			return <Row className="justify-content-center my-5">
				<p>There was an error loading your data!</p>
				</Row>
		}

    return (
    <>
        <>
            <Router>
                <NavbarView />
                <Routes>
                <Route
                    path="/"
                    element={<>
                      {(!user) ? <><Col><LoginView onLoggedIn={(user) => onLoggedIn(user)} /></Col></> :
                      <><Row className="main-view justify-content-md-evenly m-0 p-5 align-items-start">
                            <MoviesList />
                        </Row></>}
                    </>}/>
                        <Route path="/movies/:movie_id" element={<MovieView />} /> 

                        <Route path="directors/:director_id" element={
                                (!user) ? <Col><LoginView onLoggedIn={user => onLoggedIn(user)} /></Col>
                                : <DirectorView />
                              }/>

                        <Route path="genres/:genre_id" element={
                              (!user) ? <Col><LoginView onLoggedIn={user => onLoggedIn(user)} /></Col>
                              : <GenreView />
                              } />

                        <Route path='profile' element={
                              (!user) ? <LoginView onLoggedIn={user => onLoggedIn(user)} />
                              : <ProfileView />
                               } />

                        <Route path='register' element={<RegisterView />} />

                        
                </Routes>
            </Router>
            </> 
    </>  
  )
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);