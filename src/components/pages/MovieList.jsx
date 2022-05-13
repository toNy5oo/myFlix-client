import React, {useState, useEffect} from 'react'
import axios from 'axios';

import { Row, Col, Container } from 'react-bootstrap/';
import { MovieCard } from '../component/card';
import { SingleMovie } from './SingleMovie';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  useParams,
  Redirect,
  useNavigate
} from "react-router-dom";


export function MovieList() {

    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState();

    useEffect(() => {
       let accessToken = localStorage.getItem('token');
       //   if (accessToken !== null) {
       //     setUser(localStorage.getItem('user'));
       //   }
       getMovies(accessToken);
       },[])
 
    //fetch movies from API
    function getMovies(token) {
        axios.get('https://my-flix-cf.herokuapp.com/movies', {
          headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
          // Assign the result to the state
          setMovies(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
      }

  return (

    
    <Row className="main-view justify-content-md-evenly m-0 p-5 align-items-start">
        
        {movies.map(m => 
          (<Col md={3} key={m._id}><MovieCard movie={m} /></Col>))}
        
    </Row>  
    
    


  )
}
