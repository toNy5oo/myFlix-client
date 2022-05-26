
import React, { useState } from "react";
import { Col, ListGroup} from 'react-bootstrap';


export function UserView(props) {

    const [user, setUser] = useState(props.user)
    
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
                                        <ListGroup.Item className="mb-3 px-4 d-flex justify-content-between"><div className="user-info-update">Birthday:</div><div className="user-info-update">{(user.Birthday) ? parseDate(user.Birthday) : ''}</div></ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                
                        
		</>
        )
    }