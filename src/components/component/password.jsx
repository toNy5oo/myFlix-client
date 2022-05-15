import React, {useState, useEffect} from 'react'
import Form from 'react-bootstrap/Form'

const PasswordInput = () => {
  
    return (
       
        <Form.Control
																			className="passwordInput" 
																			type="password" 
																			name="Password"
																			placeholder='Type your new password'
																			onChange={handleChange}
																			/>
      
  )
}

export default PasswordInput