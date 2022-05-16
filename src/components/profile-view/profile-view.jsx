import React, {useState, useEffect} from 'react'
import {ListGroup, ListGroupItem, Button, Row, Col, Spinner, Form, Stack} from 'react-bootstrap';
import axios from 'axios';


export function ProfileView() {

  const baseURL = 'https://my-flix-cf.herokuapp.com/';
  const accessToken = localStorage.getItem('token');
  
  const username = localStorage.getItem('user');

  const [user, setUser] = useState('');
  const [updateUser, setUpdateUser] = useState('');
  //const [userDocument, setUserDocument] = useState('');
  
  
  //Setting loading and error variables 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    
        axios.get(baseURL+'users/'+username, { headers: { Authorization: `Bearer ${accessToken}`} })
            .then(response => {
                console.log(response.data);
                setUser(response.data);
                })
            .catch(error => {
                console.log(error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            })
  },[])

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
		//console.log('changing '+e.target.value)
		setUpdateUser(prevUser => {
			return {
				...prevUser,
				[e.target.name]: e.target.value
			}
		})
		console.log(e.target.name)
		console.log(e.target.value)
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
                return <p>Your account has been deleted</p>
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
        <Row className="justify-content-center my-5">
				<Col md={4}> 
				
                <div className="h3 text-muted text-center m-1 p-3">
                    My Profile
                </div>
				<Form>

				
					<Form.Group className="mb-3" controlId="formPassword">	
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
				
					<Form.Group className="mb-3" controlId="formPassword">	
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
					</Form.Group>

					
				
					<Form.Group className="mb-3" controlId="formEmail">		
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
				
					<Form.Group className="mb-3" controlId="formBirthday">		
						<div className="d-flex justify-content-between align-items-center my-5">
								<div className="h5 text-muted text-center"><Form.Label>Birthday</Form.Label></div>
								<div className="h5 text-muted text-center"><Form.Control 
																				type="email"
																				name="Birthday" 
																				placeholder={parseDate(user.Birthday)} 
																				/></div>
						</div>
					</Form.Group>
					
					<Form.Group className="mb-3" controlId="formFavourites">		
						<div className="d-flex justify-content-between align-items-center my-5">
								<div className="h5 text-muted text-center"><Form.Label>Favourite Movies</Form.Label></div>
								<div className="h5 text-muted text-center"><Form.Control 
																				type="email" 
																				placeholder="Test" 
																				/></div>
						</div>
					</Form.Group>
				
									
					<div className="d-flex justify-content-around align-items-center my-5">
						<Button className="h2 text-center" variant="secondary" onClick={handleUpdate}>Update my account</Button>
						<Button className="h2 text-center" variant="secondary" onClick={handleDelete}>Delete  my account</Button>
					</div>
				</Form>
										
                </Col>
        </Row>
    </>
    
  )
}