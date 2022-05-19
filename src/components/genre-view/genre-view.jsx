import React, {useState, useEffect} from 'react'
import {Row, Col, Spinner, Stack, ListGroup, Container} from 'react-bootstrap';
import axios from 'axios';
import {
	useParams,
} from "react-router-dom";
import { MovieCard } from '../movie-card/movie-card'
import { func } from 'prop-types';

export function GenreView() {

    const baseURL = 'https://my-flix-cf.herokuapp.com/';
    const [genre, setGenre ] = useState('');
    const [movies, setMovies] = useState('');
    const [genresMovies, setGenresMovies] = useState('');

    //Setting loading and error variables 
		const [loading, setLoading] = useState(true);
		const [error, setError] = useState();

    const {genre_id} = useParams();

    useEffect(() => {
      let accessToken = localStorage.getItem('token');
      getMissingData(accessToken)
      },[])

      async function getMissingData(accessToken) {
        axios.all([
              axios(baseURL + 'genres/' + genre_id,{ headers: { Authorization: `Bearer ${accessToken}`} } ),
              axios(baseURL + 'movies/',{ headers: { Authorization: `Bearer ${accessToken}`} } )
              ])
                .then(axios.spread((genreData, moviesData) => {
                  setGenre(genreData.data)
                  setMovies(moviesData.data)
                  moviesData.data.forEach(movie => {
                    if (movie.Genre.includes(genre_id)) setGenresMovies(prevData => {
                        return [...prevData, movie]
                    })
                  })
                  
                }))
                .catch(error => console.error(error))
                .finally(() => {
                  console.log('Genres movies: '+ genresMovies)
                  setLoading(false)
                })												
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
        <Row className="justify-content-center my-4">
            <ListGroup>
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
            <Row className="main-view justify-content-md-evenly m-0 p-2 align-items-start">{(genresMovies) ? genresMovies.map(movie => 
                  (<Col md={3} key={movie._id}><MovieCard md={8} movieData={movie} /></Col>)) : <Col md={3}>There are no movies in this genre</Col>}
            </Row>
        </ListGroup>
        
        
       
           
    </>
    
  )
}