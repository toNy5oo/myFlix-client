import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RegisterView from '../register-view/register-view';

export function RegisterView() {
  
  const handleRegistration = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('')
    // logic here
  };

  return (
    <div className="registerForm">Registration
    </div>
    // <form>
    //   <label>
    //     Username:
    //     <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
    //   </label>
    //   <label>
    //     Password:
    //     <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
    //   </label>
    //   <button type="button" onClick={handleRegistration()}>Register</button>
    // </form>
  );
}

RegisterView.propTypes = {
    user: PropTypes.exact({
      username: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      birthday: PropTypes.string.isRequired
    }).isRequired,
  };