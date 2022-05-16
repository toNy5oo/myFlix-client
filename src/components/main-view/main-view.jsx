import React, {useState, useEffect} from 'react'
import axios from 'axios';

import { Row, Col, Spinner } from 'react-bootstrap/';
import { MovieCard } from '../component/card';

export function MovieList() {

    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);
		const [error, setError] = useState();

    useEffect(() => {
      let accessToken = localStorage.getItem('token');
      let activeUser = localStorage.getItem('user');
      getMovies(accessToken, activeUser);
      },[])
 
    //fetch movies from API
    async function getMovies(token, activeUser) {
        const response =  await axios.get('https://my-flix-cf.herokuapp.com/movies', {
          headers: { Authorization: `Bearer ${token}`}
        })
        setMovies(response.data)
        getUserInfo(token, activeUser);
      }

      //fetch movies from API
    async function getUserInfo(token, activeUser) {
      const response =  await axios.get('https://my-flix-cf.herokuapp.com/users/'+activeUser, {
        headers: { Authorization: `Bearer ${token}`}
      })
      setUser(response.data) 
      console.log('User in MovieList')        
      console.log(user)        
      setLoading(false);
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

    
    <Row className="main-view justify-content-md-evenly m-0 p-5 align-items-start">
        
        {movies.map(m => (<Col md={3} key={m._id}><MovieCard userData={user} movieData={m} /></Col>))}
        
    </Row>  
    
  )
}
