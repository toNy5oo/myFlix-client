import React, {useState, useEffect} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Card, ListGroup, ListGroupItem, Button, Row, Col, Image, Stack, Spinner} from 'react-bootstrap';
import {
	Link,
	useParams,
	useNavigate,
	useLocation
} from "react-router-dom";
import CardGroup from 'react-bootstrap/CardGroup';
import '../movie-view/movie-view.css'

export function MovieView(props) {
		
		const baseURL = 'https://my-flix-cf.herokuapp.com/';
				
		//Destructuring the params Object
		const navigate = useNavigate();
		const location = useLocation();
		
		//Retrieving data from Link state
		const userData = location.state[0];
		const movieData = location.state[1];
		//Initializing movie and user obj
		const [user, setUser] = useState(userData);
		const [movie, setMovie ] = useState(movieData);
		
		
		const [director, setDirector ] = useState('');
		const [genres, setGenres] = useState([]);
		const [isFavourite, setIsFavourite] = useState(false);

		//Setting loading and error variables 
		const [loading, setLoading] = useState(true);
		const [error, setError] = useState();
		
		useEffect(() => {
			let accessToken = localStorage.getItem('token');
			getDirectorData(accessToken)
			movie.Genre.forEach(genre_id => {
				getGenresData(accessToken, genre_id)
			})
			console.table(genres);
			setLoading(false)			
		},[])

		async function getDirectorData(accessToken){
			const directorURL = baseURL + 'directors/' + movie.Director;
			const response = await axios.get(directorURL,{ headers: { Authorization: `Bearer ${accessToken}`} } );
			setDirector(response.data);
		}

		async function getGenresData(accessToken, genreID){
			const genreURL = baseURL + 'genres/' + genreID;
			const response = await axios.get(genreURL,{ headers: { Authorization: `Bearer ${accessToken}`} } );
			const genreData = response.data.Name;
			setGenres(prevData => {
				return [...prevData, genreData] 
			})
		}

		const isFeatured = (val) => {
			if (movie != '') { 
				if (val) 		return <strong>Available</strong>;
				else			return 'Not Available';
			}
		}

		const addFavouriteMovie = () => {
			let accessToken = localStorage.getItem('token');
			let compositeURL = baseURL + 'users/' + user +'/favourites/'+ movie._id;
			axios.put(compositeURL, { headers: { Authorization: `Bearer ${accessToken}`} } 
						).then(response => {
							console.log(response.data);
							setIsFavourite(true)
							})
						.catch(error => {
							console.log(compositeURL);
							console.log(error);
							setError(error);
						})
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
				<p>There was an error loading your data!</p>
				</Row>
		}

		return (
		<>
		
		<Row className="justify-content-center my-5">
				<Col md={6}> 
						<div className="h3 text-muted text-center">{movie.Title}</div>
							
							<div className="p-1 m-1 h6 text-muted text-center">
								{/* <p>({genres.map((g, i) => (i !=0 ) ? ', '+{g} : <Link to={`/genres/${genres}`}>{g}</Link>)})</p> */}
								<p>({
										genres.map((g, i) => (i!=0) ? <>, <Link to={`/genres/${g}`}>{g}</Link></> : <Link to={`/genres/${g}`}>{g}</Link>)
									})</p>
							</div>

							<div className="p-4 m-3 h5 text-muted text-center">
								<p>Directed by <Link to={`../directors/${director._id}`}>{director.Name}</Link></p>
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
						<div>Available in Theathers</div><div className="bg-light border p-2 m-3 px-3">{isFeatured(movie.Featured)}</div>
						</Stack>
						<Stack gap={3} className="col-md-5 text-center mx-auto">
										<Button variant="link text-muted" onClick={addFavouriteMovie}>Add to favourites</Button>
										{(isFavourite) && <Button variant="link text-muted">Remove from Favourites</Button>}
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


// //async function getMovieData(accessToken) {
// 	const movieURL = baseURL + 'movies/' + movie_id;
// 	const response = await axios.get(movieURL,{ headers: { Authorization: `Bearer ${accessToken}`} } );
	
// 	setMovie(response.data);
	
// 	//Fetching Director from ID
// 	getDirectorData(accessToken, response.data.Director);
	
// 	//Fetching Genres from ID
// 	response.data.Genre.forEach(g => {
// 		getGenresData(accessToken, g)
// 	})
	
// 	//If movie exists in user favourite list
// 	if (user.FavoriteMovies.includes(movie_id)) setIsFavourite(true)
	
// 	// //Movie can be displayed and the loading spinner set off
// 	 setLoading(false)
// }