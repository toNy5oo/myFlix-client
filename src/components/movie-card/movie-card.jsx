import React from 'react';
import PropTypes from 'prop-types';
import {Card, ListGroup, ListGroupItem, Button} from 'react-bootstrap';
import CardGroup from 'react-bootstrap/CardGroup';
import './movie-card.css'
import axios from 'axios';
export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    const defineGenre = () =>{
      // axios.get('https://my-flix-cf.herokuapp.com//movies/'+movie.Title+'/details')
      //     .then(response => {}
      //     )
      //     .catch(error => {
      //       console.log(error);
      //     });
    };

    function isFeatured(val){
      if (val)
       return <strong>Available in Theathers</strong>;
       else
       return 'N/A in Theathers';
    }

    return (
      <Card>
        {/* crossorigin="anonymous" is important to bypass CORP security protection */}
        <Card.Img variant="top" src={movie.ImagePath} crossOrigin="anonymous" onClick={() => onMovieClick(movie)}/>
        {/* <Card.ImgOverlay>
        <Button className='movie_details' onClick={() => onMovieClick(movie)} variant="primary">Details</Button>
        </Card.ImgOverlay> */}
          <Card.Body>
          <Card.Title as="h5" className="description">{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem key={movie._id}>Genre: {defineGenre()}</ListGroupItem>
            <ListGroupItem key={movie._Actors}>Actors:{}</ListGroupItem>
            <ListGroupItem key="theater" className="text-center">{isFeatured(movie.Featured)}</ListGroupItem>
          </ListGroup>
          <Card.Body className="d-flex justify-content-between">
            <Card.Link href="#">Add to favourites</Card.Link>
            <Card.Link href="#">Remove from Favourites</Card.Link>
          </Card.Body>
        </Card>
      
    )
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};