
import React, { useState } from "react";
import { Button, Row, Col, Spinner, ListGroup} from 'react-bootstrap';
import { UpdateView } from './update-view';
import { FavouritesView } from './favourite-view';

export function UserView(props) {

    const [user, setUser] = useState(props.user)
    // const [isUpdate, setIsUpdate] = useState(false)

    const parseDate = (date) => {
        console.log(date);
      let newDate = date.split('T');
      return newDate[0]
}

const toggleUpdateShow = () => {
    setIsUpdate((prevData) => {
        return !prevData;    
    })
}

// function handleDelete () {
//   console.log(baseURL+ 'users/'+user.Username)
//     axios.delete(baseURL+ 'users/'+user.Username, { headers: { Authorization: `Bearer ${accessToken}`} })
//     .then(response => {
//         console.log(response.data);
//         alert("Your account has been deleted. Thank you for using this API Service.");
//         localStorage.clear();
//         window.open("/", "_self");
//         })
//     .catch(error => {
//         console.log(error);
//         setError(error);
//     }) 
// }
  
  return (
      <>
        
                        
                                <Col md={5}> 
                                    <ListGroup className="mb-3 px-4">
                                        <ListGroup.Item className="mb-3 px-4 d-flex justify-content-between"><div className="user-info-update">Username:</div><div className="user-info-update">{user.Username}</div></ListGroup.Item>
                                        <ListGroup.Item className="mb-3 px-4 d-flex justify-content-between"><div className="user-info-update">Email:</div><div className="user-info-update">{user.Email}</div></ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                
                                <Col md={5}>
                                <ListGroup className="mb-3 px-4">
                                        <ListGroup.Item className="mb-3 px-4 d-flex justify-content-between"><div className="user-info-update">Password:</div><div className="user-info-update">****</div></ListGroup.Item>
                                        <ListGroup.Item className="mb-3 px-4 d-flex justify-content-between"><div className="user-info-update">Birthday:</div><div className="user-info-update">{parseDate(user.Birthday)}</div></ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                
                        
		</>
        )
    }