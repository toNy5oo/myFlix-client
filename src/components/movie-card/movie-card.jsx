import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Card } from 'react-bootstrap';
import { Link } from "react-router-dom";

import '../movie-card/movie-card.css'

export function MovieCard(props) {
 
  const [movie, setMovie ] = useState(props.movieData);
  const [user, setUser ] = useState('');
 
    useEffect(() =>{
    },[])

    return (
        <Card>
        {/* crossorigin="anonymous" is important to bypass CORP security protection */}
          <Link to={`/movies/${movie._id}`}>
              <Card.Img variant="top" src={movie.ImagePath} crossOrigin="anonymous"/>
          </Link>
          <Card.Body>
          <Card.Title as="h5" className="description">{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          </Card.Body>
        </Card>
       )
    }