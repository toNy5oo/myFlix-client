import React, {useState, useEffect} from 'react'
import { Row, Spinner, Col, Button,  } from 'react-bootstrap';
import axios from 'axios';

import {UpdateView} from './update-view'
import {UserView} from './user-view'
import {FavouritesView} from './favourite-view'
import { useSelector } from 'react-redux';

export function ProfileView(props) {

//REACT REDUX way to get state
  const movies = useSelector((state) => state.movies)
  
  const accessToken = localStorage.getItem('token');
  const activeUser = localStorage.getItem('user');

  const [user, setUser] = useState(props.user);
  const [isUpdate, setIsUpdate] = useState(false)
   
  //Setting loading and error variables 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
	getMissingData()
  },[])

  async function getMissingData() {
	axios('users/' + activeUser,{ headers: { Authorization: `Bearer ${accessToken}`} } )
		  .then(response => {
			  setUser(response.data)
			})
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
  axios.delete('users/'+user.Username, { headers: { Authorization: `Bearer ${accessToken}`} })
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
                                  <FavouritesView user={user} />
                              </Col>
                        </Row>
                        : 
                        <UpdateView user={user} />
                        }
                    </>
    </>
  )
}
