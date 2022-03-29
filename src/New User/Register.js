import React,{useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
    const navigate = useNavigate();
  const [formInput, setFormInput] = useState({
        email: "",
      password: "",
        password2:""
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
          <Form.Group className='mb-3'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder='re-enter password' name="password2" onChange={handleChange} value={formInput["password"]}/>
          </Form.Group>
          <Form.Group>
          <Button variant="success" className='mx-3'>Submit</Button>
            <Button variant='primary' onClick={()=>navigate("/")}>Already a user?</Button>
            </Form.Group>
    </Form>
  )
}
