import React, {useState, useEffect} from 'react'
import {Card, ListGroup, ListGroupItem, Button, Row, Col, Image, Stack, Spinner} from 'react-bootstrap';
import axios from 'axios';
import { MovieCard} from '../movie-card/movie-card'

export function FavouritesView() {

  const baseURL = 'https://my-flix-cf.herokuapp.com/';
  
  const [user, setUser] = useState('');
  const [favouriteMovies, setFavouriteMovies] = useState('');
  const [movies, setMovies] = useState('');
  
  //Setting loading and error variables 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    let accessToken = localStorage.getItem('token');
    let activeUser = localStorage.getItem('user');
    
    getMissingData(accessToken, activeUser)
    },[])

    async function getMissingData(accessToken, activeUser) {
      axios.all([
            axios(baseURL + 'users/' + activeUser,{ headers: { Authorization: `Bearer ${accessToken}`} } ),
            axios(baseURL + 'movies/',{ headers: { Authorization: `Bearer ${accessToken}`} } )
            ])
              .then(axios.spread((userData, moviesData) => {
                setUser(userData.data)
                setMovies(moviesData.data)
                moviesData.data.forEach(movie => {
                  if (userData.data.FavoriteMovies.includes(movie._id)) setFavouriteMovies(prevData => {
                      return [...prevData, movie]
                  })
                })
                
              }))
              .catch(error => console.error(error))
              .finally(() => {
                setLoading(false)
              })												
    }


  if (error) {
    return <Row className="justify-content-center my-5">
        <p>There was an error loading your data!</p>
        </Row> 
    }

    //If data is not fetched, show spinner
    if (loading) {
        return <Row className="justify-content-center my-5">
                    <div className="h3 text-muted text-center">Data is loading
                        &nbsp;<Spinner animation="border" variant="secondary" role="status" />
                    </div>
                </Row>		
    }

  return (
    <>
        <Row className="justify-content-center my-4">
				<Col md={6}> 
						{ (favouriteMovies) && <div className="h4 text-muted text-center">List of your favourite movies</div>}
        </Col>
        </Row>
        <Row className="main-view justify-content-md-evenly m-0 p-2 align-items-start">{(favouriteMovies.length > 0) ? favouriteMovies.map(movie => 
                  (<Col md={3} key={movie._id}><MovieCard md={8} movieData={movie} /></Col>)) : 
                  (<Row className="justify-self-center my-2">
                  <Col><div className="h4 text-muted text-center">You have not added yet a favourite movie</div></Col>
                  </Row>)}
        </Row>
    </>
    
  )



}