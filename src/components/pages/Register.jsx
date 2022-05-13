import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'; 
import {Form, Button, Card, CardGroup, Container, Row, Col} from 'react-bootstrap';

export function Register(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('')
  // Validation
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');
  const [ emailErr, setEmailErr ] = useState('');

  const validate = () => {
    let isReq = true;
    if(!username){
     setUsernameErr('Username is required');
     isReq = false;
    }else if(username.length < 5){
     setUsernameErr('Username must be minimum 5 characters long');
     isReq = false;
    }
    if(!password){
     setPasswordErr('Password is required');
     isReq = false;
    }else if(password.length < 6){
     setPassword('Password must be minimum 6 characters long');
     isReq = false;
    }
    if (!email){
      setEmailErr('Email address is required');
      isReq = false;
    }else if (email.indexOf('@') === -1){
      setEmailErr('Email format is invalid');
      isReq = false;
    }
    return isReq;
   }

  
  const handleRegistration = () => {
    e.preventDefault();
    const isReq = validate();
    if (isReq){
          axios.post('https://my-flix-cf.herokuapp.com/users', {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
          })
          .then(response => {
            console.log(response.data);
            window.open('/', '_self');
          })
          .catch(e => {
            console.log('Error during registration');
            alert('Registration not completed');
          });
    }
  };

  return (

    <Container>
      <Row>
        <Col>
        <Form>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Username" 
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />{usernameErr && <p>{usernameErr}</p>}
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          minLength="8"
        />{passwordErr && <p>{passwordErr}</p>}
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />{emailErr && <p>{emailErr}</p>}
      </Form.Group>
      <Form.Group>
        <Form.Label>Birthday</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Birthday" 
        />
      </Form.Group>
      <Button type="submit" onClick={handleRegistration}>
      Submit
    </Button>
    </Form>
        </Col>
      </Row>
    </Container>

  )
}

// RegisterView.propTypes = {
//     user: PropTypes.shape({
//       Username: PropTypes.string.isRequired,
//       Password: PropTypes.string.isRequired,
//       Email: PropTypes.string.isRequired
//     })
//   };