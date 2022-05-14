import React, {useState, useEffect} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Card, ListGroup, ListGroupItem, Button, Row, Col, Image, Stack, Spinner} from 'react-bootstrap';
import {
	Link,
	useParams,
	useNavigate
} from "react-router-dom";
import CardGroup from 'react-bootstrap/CardGroup';
import '../styles/movie-view.css'

export function SingleMovie() {

		const baseURL = 'https://my-flix-cf.herokuapp.com/';

		//Destructuring the params Object
		const {movie_id} = useParams();
		const navigate = useNavigate();

		const [movie, setMovie ] = useState('');
		const [director, setDirector ] = useState('');
		const [genres, setGenres] = useState('');

		//Setting loading and error variables 
		const [loading, setLoading] = useState(true);
		const [error, setError] = useState();

		// let { directorName, directorBio } = {};

		useEffect(() => {
			
			console.log('useEffect_MOVIE.......................................................');
			let accessToken = localStorage.getItem('token');
			//Fetching Movie through ID
			console.log('getMovie');
				axios.get(baseURL + 'movies/' + movie_id,
				{ headers: { Authorization: `Bearer ${accessToken}`} }
				).then(response => {
					// Assign the result to the state
					setMovie(response.data)
					console.log(response.data);
				})
				.catch(function (error) {
					console.log(error);
					setError(error);
				})
				.finally(() => {
					setLoading(false);
				})
			}, [])


		//Fetch Movie Data on page Loaded
		useEffect(() => {
			
			console.log('useEffect_REST.......................................................');
				//Fetching Director through ID
				console.log('getDirector')
				let directorURL = baseURL + 'directors/' + movie.Director;
				axios.get(directorURL)
						.then(response => {
							console.log(response.data);
							setDirector(response.data);
							})
						.catch(error => {
							console.log(error);
							setError(error);
						})
						.finally(() => {
							setLoading(false);
						})
		},[movie])

		 

		// function getGenres() {
		// 	if (movie != '') { 
				
		// 		console.log('getGenre');
		// 		console.log(movie.Genre);

		// 		movie.Genre.forEach((genre) => {
		// 				let genreURL = baseURL + 'genres/' + genre;
		// 				axios.get(genreURL)
		// 								.then(response => {
		// 									//console.log(response.data.Name)
		// 									setGenres(...genres, response.data.Name)
		// 								})
		// 								.catch(error => {
		// 									console.log(error);
		// 								})
		// 				})
						
		// 			}
		// 			console.table(genres);
		// 		}


			// 	for (let genre in movie.Genre) {
			// 				let genreURL = baseURL + 'genres/' + genre;
			// 					axios.get(genreURL)
			// 							.then(response => {
			// 								setGenres(response.data.Name)
			// 							})
			// 							.catch(error => {
			// 								console.log(error);
			// 							})
			// 			}

			// 			console.log(Object.entries(genres))
			// }
			// console.log('GenreObj '+genres)
			// parseGenres();
	   
		

		// function getDirector () {
		// 	if (movie != '') {      
		// 							console.log('getDirector')
		// 							let directorURL = baseURL + 'directors/' + movie.Director;
		// 							axios.get(directorURL)
		// 									.then(response => {
		// 										console.log(response.data);
		// 										setDirector(response.data);
		// 										})
		// 									.catch(error => {
		// 										console.log(error);
		// 									});
		// 						 }
		// }

		// const parseGenres = () => {
		//   if (movie != '') { 
		//         console.log('parseGenre '+genres)
		//           let genreList = '';
		//           for (var i in genres) {
		//               if (i!=0) genreList += ',  ';
		//               genreList += genres[i];
		//           }
		//           console.log(genreList)
		//           return genreList;
		//         }
		// }

		// const parseActors = () => {
		//   if (movie != '') { 
		//         console.log('parseActors')
		//           let actorsList = '';
		//           for (var i in movie.Actors) {
		//               if (i!=0) actorsList += ',  ';
		//               actorsList += movie.Actors[i];
		//           }
		//           return actorsList;
		//         }
		// }

		const isFeatured = (val) => {
			if (movie != '') { 
				console.log('isFeatured')
								if (val)
							return <strong>Available</strong>;
							else
							return 'Not Available';
			}
		}



		//If data is not fetched, show spinner
		if (loading) {
			return <Row className="justify-content-center my-5">
						<div className="h3 text-muted text-center">Data is loading
							&nbsp;<Spinner animation="border" variant="secondary" role="status" />
						</div>
					</Row>		
		 }

		if (error || !Array.isArray(movie.Actors)) {
			return <Row className="justify-content-center my-5">
				<p>There was an error loading your data!</p>;
				</Row>
		}


		return (
		<>
		<Row className="justify-content-center my-5">
				<Col md={6}> 
						<div className="h3 text-muted text-center">{movie.Title}</div>
							
							<div className="p-4 m-3 h5 text-muted text-center">
								<p>Directed by {director.Name}</p>
								&nbsp;
								<p>{movie.Description}</p>
							
						</div>    
						<Stack gap={2} className="d-flex justify-content-center align-items-center">
										<div>Actors</div><div className="bg-light border p-2 m-3 px-3">
											{ 
											movie.Actors.map((actor, i) => (i!=0) ? ', '+actor : actor)
											}
										</div>
						</Stack>
						<Stack gap={2} className="d-flex justify-content-center align-items-center">              
										<div>Genre</div><div className="bg-light border p-2 m-3 px-3">{}</div>
						</Stack>
						<Stack gap={2} className="d-flex justify-content-center align-items-center">
						<div>Available in Theathers</div><div className="bg-light border p-2 m-3 px-3">{isFeatured(movie.Featured)}</div>
						</Stack>
						<Stack gap={3} className="col-md-5 mx-auto">
										<Button variant="link text-muted">Add to favourites</Button>
										<Button variant="link text-muted">Remove from Favourites</Button>
						</Stack>
						<Stack gap={2} className="col-md-5 mx-auto text-center m-4 p-2">
										<Button variant="secondary" onClick={() => { navigate('/') }}>Back to all movies</Button>     
						</Stack>
				</Col>

		<Col md={2}> 
					<Image className="poster" src={movie.ImagePath} crossOrigin="anonymous"/>
				</Col>
		</Row>
		
		</>
		)
}
		
	
// MovieView.propTypes = {
//   movie: PropTypes.shape({
//     Title: PropTypes.string.isRequired,
//     Description: PropTypes.string.isRequired,
//     ImagePath: PropTypes.string.isRequired
//   }).isRequired,
//   onBackClick: PropTypes.func.isRequired
// };