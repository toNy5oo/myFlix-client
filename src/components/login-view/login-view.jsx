import React, { useState, useRef, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PropTypes from 'prop-types';
import RegisterView from '../register-view/register-view';
import {Form, FormGroup, Button, Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';

import './login-view.css';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
 // Declare hook for each input
 const [ usernameErr, setUsernameErr ] = useState('');
 const [ passwordErr, setPasswordErr ] = useState('');

// validate user inputs
const validate = () => {
   let isReq = true;
   if(!username){
    setUsernameErr('Username Required');
    isReq = false;
   }else if(username.length < 2){
    setUsernameErr('Username must be minimum 2 characters long');
    isReq = false;
   }
   if(!password){
    setPasswordErr('Password Required');
    isReq = false;
   }else if(password.length < 6){
    setPassword('Password must be minimum 6 characters long');
    isReq = false;
   }
   return isReq;
  }


  const handleSubmit = (e) => {
    const isReq = validate();
    e.preventDefault();
    axios.post('https://my-flix-cf.herokuapp.com/login', {
      Username: username,
      Password: password,
    })
    .then(response => {
      const data = response.data;
      console.log(data)
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log(e)
      console.log('no such user')
    });
  };

  function handleNewUser(e) {
    console.log('Registration...');
    <Router>
      <Link to="/register"></Link>
      <Route path="/register">
          <RegisterView />
          </Route>
    </Router>
  };
  

  return (
        

      <Row className="d-flex justify-content-evenly">
      <Col></Col>
      <Col xs={4} className="left_side">
        <Form className="d-flex flex-column justify-content-between align-items-center p-2 mt-4"> 
          <Form.Group controlId="formUsername" className="mt-3">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" onChange={e => setUsername(e.target.value)} placeholder="Enter username" value={username}/>{usernameErr && <p>{usernameErr}</p>}
          </Form.Group>

          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={handleSubmit} className="mt-4">
            Submit
          </Button>
        </Form>
      </Col>
      
      <Col xs={6} className="right_side d-flex flex-column justify-content-center align-items-center p-2 mt-4">
        <p>Please enter your details to login into the application.</p>
        <p>If you don't have an account, please <a href="#" onClick={handleNewUser()}>click here</a> to register.</p>
      </Col>
      <Col></Col>
     </Row>

    
  );
}

// LoginView.propTypes = {
//     user: PropTypes.exact({
//       username: PropTypes.string.isRequired,
//       password: PropTypes.string.isRequired,
//     }).isRequired,
//   };