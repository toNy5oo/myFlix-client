import React, {useState, useEffect} from 'react'
import {ListGroup, ListGroupItem, Button, Row, Col, Spinner} from 'react-bootstrap';
import axios from 'axios';
import {
	Link,
	useParams,
	useNavigate
} from "react-router-dom";

export function DirectorView() {

    const {director_id} = useParams();
//   const baseURL = 'https://my-flix-cf.herokuapp.com/';
  
//   const [user, setUser] = useState(localStorage.getItem('user'));
//   const [userDocument, setUserDocument] = useState('');
//   const [updateUsername, setUpdateUsername] = useState(false);
  
//   //Setting loading and error variables 
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState();

//   useEffect(() => {
//     let accessToken = localStorage.getItem('token');
//         axios.get(baseURL+'users/'+user, { headers: { Authorization: `Bearer ${accessToken}`} })
//             .then(response => {
//                 console.log(response.data);
//                 setUserDocument(response.data);
//                 })
//             .catch(error => {
//                 console.log(error);
//                 setError(error);
//             })
//             .finally(() => {
//                 setLoading(false);
//             })
//   },[])

//     if (error) {
//     return <Row className="justify-content-center my-5">
//         <p>There was an error loading your data!</p>
//         </Row>
//     }

//     //If data is not fetched, show spinner
//     if (loading) {
//         return <Row className="justify-content-center my-5">
//                     <div className="h3 text-muted text-center">Data is loading
//                         &nbsp;<Spinner animation="border" variant="secondary" role="status" />
//                     </div>
//                 </Row>		
//     }

//     const updateUsernameField = () => {
//         setUpdateUsername(true);
//     }

  return (
    <>
        <Row className="justify-content-center my-5">
				<Col md={4}> 
				                    <div className="h3 text-muted text-center m-1 p-3">Director View: {director_id}</div>			
                </Col>
        </Row>
    </>
    
  )
}