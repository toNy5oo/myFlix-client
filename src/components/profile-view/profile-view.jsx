import React, {useState, useEffect} from 'react'
import {ListGroup, ListGroupItem, Button, Row, Col, Spinner, Form, Stack} from 'react-bootstrap';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card'
import { Card } from 'react-bootstrap';
import { Link } from "react-router-dom";


export function ProfileView(props) {

  const baseURL = 'https://my-flix-cf.herokuapp.com/';
  const accessToken = localStorage.getItem('token');
  const activeUser = localStorage.getItem('user');

  const [user, setUser] = useState('');
  const [updateUser, setUpdateUser] = useState('');
  const [favouriteMovies, setFavouriteMovies] = useState('');
  const [movies, setMovies] = useState('');
   
  //Setting loading and error variables 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
	getMissingData()
  },[])

  async function getMissingData() {
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

  const showPasswordInput = (e) => {
	console.log('click');
	setUpdateUser(prevUser => {
	  return {
		...prevUser,
		[updateUser.Password]: 'A'
	  }
	})
  }

  	function handleChange (e) {
		setUpdateUser(prevUser => {
			return {
				...prevUser,
				[e.target.name]: e.target.value
			}
		})
		// console.log(e.target.name)
		// console.log(e.target.value)
	  }

	  function handleUpdate () {
			axios.put(baseURL, { headers: { Authorization: `Bearer ${accessToken}`} })
			.then(response => {
                console.log(response.data);
                })
            .catch(error => {
                console.log(error);
                setError(error);
            })
	  }

	  function handleDelete () {
		  console.log(baseURL+ 'users/'+user.Username)
			axios.delete(baseURL+ 'users/'+user.Username, { headers: { Authorization: `Bearer ${accessToken}`} })
			.then(response => {
                console.log(response.data);
                alert("Your account has been deleted. Thank you for using this API Service.");
				localStorage.clear();
				window.open("/", "_self");
                })
            .catch(error => {
                console.log(error);
                setError(error);
            }) 
	  }

  	const parseDate = (date) => {
		  		console.log(date);
				let newDate = date.split('T');
				return newDate[0]
	  }

	const movieCardUnit = (movie) => {
		return <>
				<Card>
					<Card.Body className='d-flex justify-content-between px-4 py-2 align-items-center'>
					<Card.Text as='div'>
						{movie.Title}
					</Card.Text>
					<Button variant="secondary" size="sm" onClick={removeMovieFromFavs} id={movie._id}>
						Remove
					</Button>
					</Card.Body>
					<Link to={`/movies/${movie._id}`}>
              					<Card.Img variant="bottom" src={movie.ImagePath} crossOrigin="anonymous"/>
          			</Link>
				</Card>
				</>
	}  

	const removeMovieFromFavs = (e) => {
		let movieToRemove = ([e.target.id]);
		axios.delete(baseURL+'users/'+ activeUser +'/favs/'+ movieToRemove, { headers: { Authorization: `Bearer ${accessToken}`} })
			.then(response => {
                console.log(response.data);
					setFavouriteMovies(movie => {
						if (movies.filter(movie._id != movieToRemove)) return movie
					})
				})
            .catch(error => {
				console.log(baseURL+activeUser+'/favs/'+movieToRemove)
                console.log(error);
                setError(error);
            })
	}

	if (error) {
    return <Row className="justify-content-center my-5">
        	<p>There was an error loading your profile!</p>
        	</Row>
    }

    //If data is not fetched, show spinner
    if (loading) {
        return <Row className="justify-content-center my-5">
                    <div className="h3 text-muted text-center">Loading Profile
                        &nbsp;<Spinner animation="border" variant="secondary" role="status" />
                    </div>
                </Row>		
    }

     return (
    <>	<Form>
        <Row className="justify-content-center my-3"><Col><div className="h3 text-muted text-center m-1 p-2">My Profile</div></Col></Row>
	
		<Row className="justify-content-center">
				<Col md={5}> 
					
					
					{/* USERNAME */}
					
					<Form.Group className="mb-3 px-4" controlId="formPassword">	
						<div className="d-flex justify-content-between align-items-center my-5">
							<div className="h5 text-muted text-center">Username</div>
							<div className="h5 text-muted text-center"><Form.Control 
																			type="email" 
																			name="Username"
																			placeholder={user.Username}
																			onChange={handleChange}
																			/></div>
						</div>
					</Form.Group>
				
					

					{/* EMAIL */}
				
					<Form.Group className="mb-3 px-4" controlId="formEmail">		
						<div className="d-flex justify-content-between align-items-center my-5">
								<div className="h5 text-muted text-center"><Form.Label>Email address</Form.Label></div>
								<div className="h5 text-muted text-center"><Form.Control 
																				type="email" 
																				name="Email"
																				placeholder={user.Email} 
																				onChange={handleChange}
																				/></div>
						</div>
					</Form.Group>
																				
                </Col>
				
				<Col md={5}>
				<Form.Group className="mb-3 px-4" controlId="formPassword">	
						<div className="d-flex justify-content-between align-items-center my-5">
							<div className="h5 text-muted text-center">Password</div>
							<div className="h5 text-muted text-center d-flex">
								{ (updateUser.Password != '') ? <Button 
																			className="h2 text-center buttonReset" 
																			variant="secondary"
																			onClick={showPasswordInput}
																			>
																				Reset password
																			</Button> : <Form.Control
																			className="passwordInput" 
																			type="password" 
																			name="Password"
																			placeholder='Type your new password'
																			onChange={handleChange}
																			/>	}										
						</div>
						</div>
						<Form.Group className="mb-2 px-4" controlId="formBirthday">		
						<div className="d-flex justify-content-between align-items-center my-5">
								<div className="h5 text-muted text-center"><Form.Label>Birthday</Form.Label></div>
								<div className="h5 text-muted text-center"><Form.Control 
																				type="email"
																				name="Birthday" 
																				placeholder={(user.Birthday) ? parseDate(user.Birthday) : 'Date of birth'} 
																				/></div>
						</div>
					</Form.Group>
					</Form.Group>
				</Col>
        </Row>
		
		
		<Row className="justify-content-center my-3"><Col><div className="h6 text-muted text-center m-1 p-2">Favourite Movies</div></Col></Row>
		<Row className="justify-content-center">
			<Col>
			<Form.Group className="mb-3" controlId="formFavourites">		
				<>
					{<Row className="main-view justify-content-md-evenly m-0 p-2 align-items-start">
						{(favouriteMovies) 
						? favouriteMovies.map(movie => (<Col md={3} key={movie._id}>{movieCardUnit(movie)}</Col>)) 
						: (<Row className="justify-self-center my-2"><Col><div className="h4 text-muted text-center">You have not added yet a favourite movie</div></Col></Row>)}
					</Row>}
				</>
			</Form.Group>
			<Row className="justify-content-center px-5">
			<Col>
									
					<div className="d-flex justify-content-around align-items-center my-5">
						<Button className="h2 text-center" variant="warning" onClick={handleUpdate}>Update my account</Button>
						<Button className="h2 text-center" variant="danger" onClick={handleDelete}>Delete  my account</Button>
					</div>
					</Col>
		
			</Row>
			</Col>
		
		</Row>
		</Form>
    </>
    
  )
}