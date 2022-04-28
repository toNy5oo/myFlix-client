import React from 'react';
import PropTypes from 'prop-types';
import {Card, ListGroup, ListGroupItem, Button, Row, Col, Image} from 'react-bootstrap';
import CardGroup from 'react-bootstrap/CardGroup';
import './movie-view.css'

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

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
      
    <Row className="w-100 justify-content-around mx-auto">
        <Col md={8}>   
			<ListGroup>
				<ListGroup.Item><h3>{movie.Title}</h3></ListGroup.Item>
				<ListGroup.Item>Genre: {defineGenre()}</ListGroup.Item>
				<ListGroup.Item>Actors:{}</ListGroup.Item>
				<ListGroup.Item>{isFeatured(movie.Featured)}</ListGroup.Item>
				<div>
					<ListGroup.Item className="w-100 d-flex justify-content-between">
						<Button variant="link text-muted">Add to favourites</Button>
						<Button variant="link text-muted">Remove from Favourites</Button>
					</ListGroup.Item>
				</div>
				
			</ListGroup>  
			<div className="p-5 h4 text-muted">
			{movie.Description}
			</div>  
        </Col>

		<Col md={4}> 
        	<Image className="poster" src={movie.ImagePath} crossOrigin="anonymous" onClick={() => onMovieClick(movie)}/>
        </Col>
		<Button variant="primary" onClick={() => { onBackClick(null); }}>Back</Button>
    </Row>

      
 
      
     
        // <Card>
        // <Card.Img variant="top" src={movie.ImagePath} crossOrigin="anonymous" onClick={() => onMovieClick(movie)}/>
        //   <Card.Body>
        //   <Card.Title as="h5" className="description mh-200">{movie.Title}</Card.Title>
        //     <Card.Text>{movie.Description}</Card.Text>
        //   </Card.Body>
        //   <ListGroup className="list-group-flush">
        //     <ListGroupItem key={movie._id}>Genre: {defineGenre()}</ListGroupItem>
        //     <ListGroupItem key={movie._Actors}>Actors:{}</ListGroupItem>
        //     <ListGroupItem key="theater" className="text-center">{isFeatured(movie.Featured)}</ListGroupItem>
        //   </ListGroup>
        //   <Card.Body className="d-flex justify-content-between">
        //   <Card.Link href="#">Add to favourites</Card.Link>
        //   <Card.Link href="#">Remove from Favourites</Card.Link>
        //   </Card.Body>
        //   <Button variant="primary" onClick={() => { onBackClick(null); }}>Back</Button>
        // </Card>
      
      
      
      
     


      // <Card>
      //   <Card.Img variant="top" src={movie.ImagePath} crossorigin="anonymous"/>
      //   <Card.Body>
      //   <Card.Header as="h5">{movie.Title}</Card.Header>
      //     <Card.Text>
      //     {movie.Description}
      //     </Card.Text>
      //     <Button variant="primary" onClick={() => { onBackClick(null); }}>Back</Button>
      //   </Card.Body>
      // </Card>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};