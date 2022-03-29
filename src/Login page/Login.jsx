import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate();
    const [formInput, setFormInput] = useState({
        email: "",
        password:""
    })
    const handleChange = (e) => {
        let name = e.target.name;
        setFormInput({ ...formInput, [name]: e.target.value });
    }
  return (
      <Form className='d-flex flex-column '>
          <Form.Group className='mb-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' placeholder='enter your email' name="email" onChange={handleChange} value={formInput["email"]}/>
              <Form.Text className='text-muted'>Your email is safe with as</Form.Text>
          </Form.Group>

          <Form.Group className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder='enter password' name="password" onChange={handleChange} value={formInput["password"]}/>
          </Form.Group>
          <Form.Group>
          <Button variant="success" className='mx-3'>Submit</Button>
              <Button variant='warning' className='mx-2' onClick={()=>navigate("/forgotpassword")}>Forgot password ?</Button>
              <Button variant='info' className='mx-3' onClick={()=>navigate("/register")}>New user?</Button>
            </Form.Group>
    </Form>
  )
}
