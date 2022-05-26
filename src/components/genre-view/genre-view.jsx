import React, {useState, useEffect} from 'react'
import {Row, Col, Spinner, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import {
	useParams,
} from "react-router-dom";
import { MovieCard } from '../movie-card/movie-card'
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export function GenreView() {

    //REACT REDUX way to get state
    const movies = useSelector((state) => state.movies) 

    const baseURL = 'https://my-flix-cf.herokuapp.com/';
    const [genre, setGenre ] = useState('');
        
    const [moviesOfGenre, setMoviesOfGenre] = useState('');
   
    //Setting loading and error variables 
		const [loading, setLoading] = useState(true);
		const [error, setError] = useState();

    const { genre_id } = useParams();

    useEffect(() => {
      let accessToken = localStorage.getItem('token');
      getMissingData(accessToken)
      setMoviesOfGenre(getMoviesOfGenre());
      },[])

      async function getMissingData(accessToken) {
                  axios.get(baseURL + 'genres/' + genre_id, { headers: { Authorization: `Bearer ${accessToken}`} } )
                  .then(response => {
                    setGenre(response.data)
                  })
                  .catch(error => console.error(error))
                  .finally(() => {
                     setLoading(false)
                  })
      }
       
      const getMoviesOfGenre = () => {
          let moviesInArray = []
          movies.forEach(movie => {
          console.log('Movie.genre', movie.Genre, 'genre_id', genre_id)
          if (movie.Genre.includes(genre_id)) 
            moviesInArray.push(movie)
        })
        return moviesInArray
      }

      //While data is not fetched, show spinner
  if (loading) {
    return <Row className="justify-content-center my-5">
          <div className="h3 text-muted text-center">Data is loading
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
        <Row className="justify-content-center p-2 m-4">
            <ListGroup className="my-list">
              <ListGroup.Item className="h3 justify-content-center">{genre.Name}</ListGroup.Item>
              <ListGroup.Item className="h5 text-muted">{genre.Description}</ListGroup.Item>
            </ListGroup>
        </Row>
        <ListGroup horizontal>
            <Row>
              <Col>
                <ListGroup>
                   <ListGroup.Item className="h6 text-muted">Movies in the genre '{genre.Name}'</ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
            <Row className="main-view justify-content-md-evenly m-0 p-2 align-items-start">{(moviesOfGenre.length !== 0) ? moviesOfGenre.map(movie => 
                  (<Col md={3} key={movie._id}><MovieCard md={8} movie={movie} /></Col>)) : <Col md={3}>There are no movies in this genre</Col>}
            </Row>
        </ListGroup>
    </>
  )
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
  }).isRequired,
  movies: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired
};