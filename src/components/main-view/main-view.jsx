import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { MainView } from '../main-view/main-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegisterForm } from '../register-view/register-view';
import { NavbarView } from '../navbar-view/navbar-view'
import { Row, Col, Spinner } from 'react-bootstrap/';

export function MainView(props) {

    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(props.user);
    const [loading, setLoading] = useState(true);
		const [error, setError] = useState();
    const [selectedMovie, setSelectedMovie] = useState(null)

    useEffect(() => {
      let accessToken = localStorage.getItem('token');
      getMovies(accessToken);
      },[])
 
    //fetch movies from API
    async function getMovies(token) {
         const response =  await axios.get('https://my-flix-cf.herokuapp.com/movies', {
          headers: { Authorization: `Bearer ${token}`}
        })
        setMovies(response.data)
        setLoading(false);
        //getUserInfo(token, activeUser);
      }

     function setMovieAsSelected(e){
        setSelectedMovie(m);
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
       
          <Row className="main-view justify-content-md-evenly m-0 p-5 align-items-start">
        
          {movies.map(movie => (<Col md={3} key={movie._id}><MovieCard userData={user} movieData={movie}/></Col>))}
        
          </Row>  
        
    
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