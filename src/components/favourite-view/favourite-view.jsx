import React, {useState, useEffect} from 'react'
import {Card, ListGroup, ListGroupItem, Button, Row, Col, Image, Stack, Spinner} from 'react-bootstrap';
import axios from 'axios';

export function Favourites() {

  const baseURL = 'https://my-flix-cf.herokuapp.com/';
  
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [userDocument, setUserDocument] = useState('');
  
  //Setting loading and error variables 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    let accessToken = localStorage.getItem('token');
        axios.get(baseURL+'users/'+user, { headers: { Authorization: `Bearer ${accessToken}`} })
            .then(response => {
                console.log(response.data);
                setUserDocument(response.data);
                })
            .catch(error => {
                console.log(error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            })
  },[])


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
				<Col md={6}> 
						<div className="h3 text-muted text-center">List of my favourite movies</div>
        </Col>
        </Row>
    </>
    
  )



}