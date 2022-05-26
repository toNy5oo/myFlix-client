import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import {Form, Button, Row, Col} from 'react-bootstrap';

import './register-view.css'

export function RegisterView (props) {
	
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  //Declare hook for each input
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");


  //form validation logic
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr("Username is required");
      isReq = false;
    } else if (username.length < 4) {
      setUsernameErr("Username must be 4 characters long");
      isReq = false;
    }
    if (!password) {
      setPasswordErr("Password is required (6 characters long)");
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr("Password must be 6 characters long");
      isReq = false;
    }
    if (!email) {
      setEmailErr("Email is required");
      isReq = false;
    } else if (email.indexOf("@") === -1) {
      setEmail("Email must be a valid email address");
      isReq = false;
    }

    return isReq;
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios.post('users', { Username: username, Password: password, Email: email, Birthday: birthday })
        .then((response) => {
          const data = response.data;
          alert("Your registration has been successfully processed. You can now proceed to login.");
          window.open("/", "_self");
          //open in the current tab
        })
        .catch((response) => {
		alert("Your registration has NOT been successfully processed. Please try again.");
		window.open("/register", "_self");			
        });
    }
  };
	return (
    <>
          <Row className="justify-content-center my-5">
 			<Col md={4}>
 				<Form>
				 
 			<Form.Group className="py-3">
 			<div className="d-flex justify-content-between"><Form.Label>Username*</Form.Label><Form.Label className="err">{usernameErr && <>{usernameErr}</>}</Form.Label></div>
 				<Form.Control 
					type="text" 
					placeholder="Username" 
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
			</Form.Group>
			<Form.Group className="py-3">
			<div className="d-flex justify-content-between"><Form.Label>Password*</Form.Label><Form.Label className="err">{passwordErr && <>{passwordErr}</>}</Form.Label></div>
				<Form.Control 
					type="password" 
					placeholder="Password" 
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					minLength="8"
				/>
			</Form.Group>
			<Form.Group className="py-3">
			<div className="d-flex justify-content-between"><Form.Label>Email*</Form.Label><Form.Label className="err">{emailErr && <>{emailErr}</>}</Form.Label></div>
				<Form.Control 
					type="email" 
					placeholder="Email" 
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
			</Form.Group>
			<Form.Group className="py-3">
				<Form.Label>Birthday</Form.Label>
				<Form.Control 
					type="date" 
					placeholder="dd-mm-yyyy" 
					onChange={(e) => setBirthday(e.target.value)}
					value={birthday}
				/>
			</Form.Group>
			
			</Form>
			</Col>
			</Row>
			<Row>
			<Col className="d-flex justify-content-center">
			<Button variant="secondary" className="my-4" type="submit" onClick={handleRegistration}>
					Create my account
			</Button>
			</Col>
			</Row>
      </>
	)
}

RegisterView.propTypes = {
    user: PropTypes.exact({
      username: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      birthday: PropTypes.string
    }).isRequired,
  };
