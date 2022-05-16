import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Card } from 'react-bootstrap';
import { Link } from "react-router-dom";

import '../styles/movie-card.css'

export function MovieCard(props) {
 
  const [movie, setMovie ] = useState(props.movieData);
  const [user, setUser ] = useState(props.userData);
 
    useEffect(() =>{
      console.log('User')
      console.log(user)
    },[])

    return (
      
        <Card>
        {/* crossorigin="anonymous" is important to bypass CORP security protection */}
          <Link to={`/movies/${movie._id}`} state={user}>
              <Card.Img variant="top" src={movie.ImagePath} crossOrigin="anonymous"/>
          </Link>
          <Card.Body>
          <Card.Title as="h5" className="description">{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          </Card.Body>
        </Card>
       )
    }


{/* <ListGroup className="list-group-flush">
            <ListGroupItem key={movie._id}>Genre: {defineGenre()}</ListGroupItem>
            <ListGroupItem key={movie._Actors}>Actors:{}</ListGroupItem>
            <ListGroupItem key="theater" className="text-center">{isFeatured(movie.Featured)}</ListGroupItem>
          </ListGroup>
          <Card.Body className="d-flex justify-content-between">
            <Card.Link href="#">Add to favourites</Card.Link>
            <Card.Link href="#">Remove from Favourites</Card.Link>
          </Card.Body> */}



 // const defineGenre = () =>{
  //     // axios.get('https://my-flix-cf.herokuapp.com//movies/'+movie.Title+'/details')
  //     //     .then(response => {}
  //     //     )
  //     //     .catch(error => {
  //     //       console.log(error);
  //     //     });
  //   };

  //   function isFeatured(val){
  //     if (val)
  //      return <strong>Available in Theathers</strong>;
  //      else
  //      return 'N/A in Theathers';
  //   }


// MovieCard.propTypes = {
//   movie: PropTypes.shape({
//     Title: PropTypes.string.isRequired,
//     Description: PropTypes.string.isRequired,
//     ImagePath: PropTypes.string.isRequired
//   }).isRequired,
//   onMovieClick: PropTypes.func.isRequired
// };