import React, {useState, useEffect} from 'react'
import { Row, Spinner, Col, Form, Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { Link } from "react-router-dom";

import {UpdateView} from './update-view'
import {UserView} from './user-view'
import {FavouritesView} from './favourite-view'

export function ProfileView(props) {

  const baseURL = 'https://my-flix-cf.herokuapp.com/';
  const accessToken = localStorage.getItem('token');
  const activeUser = localStorage.getItem('user');

  const [user, setUser] = useState(props.user);
  const [isUpdate, setIsUpdate] = useState(false)

  const [movies, setMovies] = useState(props.movies);
   
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
			}))
			.catch(error => console.error(error))
			.finally(() => {
			  setLoading(false)
			})												
  }
  
const toggleUpdateShow = () => {
  setIsUpdate((prevData) => {
	  return !prevData;    
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

   	if (error) {
    return <Row className="justify-content-center my-5">
        	<p>There was an error loading your profile!</p>
        	</Row>
    }

    //If data is not fetched, show spinner
    if (loading) {
        return <Row className="justify-content-center my-5">
                    <div className="h3 text-muted text-center loading">Loading Profile
                        &nbsp;<Spinner animation="border" variant="secondary" role="status" />
                    </div>
                </Row>		
    }

     return (
    <>	
        <Row className="justify-content-between my-3">
            <Col>
                <div className="h4 text-muted text-center m-1 p-2">{(!isUpdate) ? 'My Profile' : 'Update profile information'}</div>
            </Col>
            <Col>
                <div className="h3 text-muted text-center m-1 p-2">
                    <Button className="h2 text-center m-1" variant="secondary" onClick={toggleUpdateShow}>{(!isUpdate) ? 'Update profile' : 'Show profile' }</Button>
					<Button className="h2 text-center m-1" variant="danger" onClick={handleDelete}>Delete  my account</Button>
                </div>
            </Col>
        </Row>

                    <> {(!isUpdate) ? 
                        <Row className="justify-content-center">
                                <UserView user={user} />
                                <Col md={12}>
                                  <FavouritesView user={user} movies={movies} />
                              </Col>
                        </Row>
                        : 
                        <UpdateView user={user} />
                        }
                    </>
		
		
    </>
  )
}


{/* <Row className="justify-content-center my-3"><Col><div className="h6 text-muted text-center m-1 p-2">Favourite Movies</div></Col></Row>
		<Row className="justify-content-center">
			<Col>
					
				{/* <>
					{<Row className="main-view justify-content-md-evenly m-0 p-2 align-items-start">
						{(favouriteMovies.lenght > 0) 
						? favouriteMovies.map(movie => (<Col md={3} key={movie._id}>{movieCardUnit(movie)}</Col>)) 
						: <Col><div className="h6 text-muted text-center">You have not added yet a favourite movie</div></Col>}
					</Row>}
				</>
			
			<Row className="justify-content-center px-5">
			<Col>
									
					<div className="d-flex justify-content-around align-items-center my-5">
						<Button className="h2 text-center" variant="warning" onClick={handleUpdate}>Update my account</Button>
						<Button className="h2 text-center" variant="danger" onClick={handleDelete}>Delete  my account</Button>
					</div>
					</Col>
		
			</Row>
			</Col>
		
		</Row> */}


{/* <Row className="justify-content-center">
				<Col md={5}> 
					
					
					
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
        </Row> */}