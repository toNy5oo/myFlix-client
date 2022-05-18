import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { BrowserRouter as Router} from "react-router-dom";
import { MainView } from '../main-view/main-view';
import { MovieView } from '../movie-view/movie-view';
import { MovieCard } from '../movie-card/movie-card';
import { FavouritesView } from '../favourite-view/favourite-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { LoginView } from '../login-view/login-view';
import { SharedView } from '../shared-view/shared-view';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams
} from "react-router-dom";
import { Row, Col, Spinner } from 'react-bootstrap/';

export function MainView(props) {

    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(props.user);
    const [loading, setLoading] = useState(true);
		const [error, setError] = useState();
    const [selectedMovie, setSelectedMovie] = useState(null)

    let params = useParams()

    useEffect(() => {
      console.log('useEffect');
      let accessToken = localStorage.getItem('token');
      console.log('Token');
      console.log(accessToken);
        if (accessToken !== null) {
          setUser(localStorage.getItem('user'));
        }
      getMovies(accessToken);
      },[])

       /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
       function onLoggedIn(authData) {
        console.log("OnLoggedIn...");
        setUser(authData.user.Username)
        
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
//getMovies(authData.token);
      }
 
    //fetch movies from API
    async function getMovies(token) {
      console.log('In getMovies');
         const response =  await axios.get('https://my-flix-cf.herokuapp.com/movies', {
         headers: { Authorization: `Bearer ${token}`}
        })
        console.log(response.data)
        setMovies(response.data)
        setLoading(false);
        //getUserInfo(token, activeUser);
      }

   //If data is not fetched, show spinner
		if (loading) {
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
        <>{(!user) && (<LoginView onLoggedIn={user => onLoggedIn(user)} />) }</>
        <>
            <Router>
                <Routes>
                <Route
                    path="/"
                    element={<>
                      {(!user) && <><Col><LoginView onLoggedIn={(user) => this.onLoggedIn(user)} /></Col></>}
                      {(movies.length === 0) && <><div className="main-view">No movies in the database</div></>}
                      {(movies.length > 0) && <><Row className="main-view justify-content-md-evenly m-0 p-5 align-items-start">{movies.map((m) => (<Col md={3} key={m._id}><MovieCard md={8} key={m._id} movieData={m} /></Col>))}</Row></>}
                    </>}/>
                        {/* <Route path="movies/:movie_id" element={<MovieView movieData={movies.find((m) => m._id === params)} />} /> 
                        <Route path="profile" element={<ProfileView user={user} />} />
                        <Route path="favourites" element={<FavouritesView user={user} />} />
                        <Route path="directors/:director_id" element={<DirectorView user={user}/>} />
                        <Route path="genres/:genre_id" element={<GenreView user={user}/>} />  */}
                </Routes>
            </Router>
            </> 
    </>  
  )
}



// ________________________________________________________________
//   //fetch movies from API
    // async function getUserInfo(token, activeUser) {
    //   const response =  await axios.get('https://my-flix-cf.herokuapp.com/users/'+activeUser, {
    //     headers: { Authorization: `Bearer ${token}`}
    //   })
    //   setUser(response.data) 
    //   console.log('User in MovieList')        
    //   console.log(user)        
    //   setLoading(false);
    // }