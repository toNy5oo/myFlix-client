import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';


export function ResetButton(props) {

  const [updateUser, setUpdateUser] = useState(props.updateUser);
 
    const showPasswordInput = (e) => {
      console.log('click');
      setUpdateUser(prevUser => {
        return {
          ...prevUser,
          [updateUser.Password]: 'A'
        }
      })
    }

    return (
      
      <Button 
      className="h2 text-center buttonReset" 
      variant="secondary"
      onClick={showPasswordInput}
      >
          Reset password
      </Button>
    )
}

