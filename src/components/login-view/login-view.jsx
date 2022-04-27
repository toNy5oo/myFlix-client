import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import RegisterView from '../register-view/register-view';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
 
  const handleSubmit = (e) => {
    //e.preventDefault();
    //console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
     props.onLoggedIn('tony');
  };

  const handleNewUser = () => {
    console.log('Registration...');
    return <RegisterView  />;
  };

  return (
    <form>
      <p>
      <label>
        Username:&nbsp; 
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      </p>
      <label>
        Password:&nbsp;
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <p>
      <button type="button" onClick={handleSubmit}>Submit</button>&emsp;
      </p>
      <p>
      If you don't have an account please <a href="#" onClick={handleNewUser}>click here</a> to create one
      </p>
    </form>
  );
}

LoginView.propTypes = {
    user: PropTypes.exact({
      username: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
    }).isRequired,
  };