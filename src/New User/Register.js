import React,{useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import { link } from "../config";
import * as axios from "axios";
import { useNavigate } from 'react-router-dom';
import "./register.css";
import { toast,ToastContainer } from 'react-toastify';
import { Loading } from '../Loading/Loading';

export const Register = () => {
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);
  const [formInput, setFormInput] = useState({
        email: "",
      password: "",
        password2:""
    })
    const handleChange = (e) => {
        let name = e.target.name;
        setFormInput({ ...formInput, [name]: e.target.value });
  }
  const createUser = async () => {
    if (formInput["password"] === formInput["password2"]) {
      setSpinner(true);
      const body = {
      email: formInput['email'],
      password:formInput['password']
    }
    await axios.post(link + "register", body).then(({ data }) => {
      if (data["success"]) {
        toast.success(data['message']);
        setTimeout(()=>navigate("/"),2000)
      }
    })
      .catch(err => {
        const { data } = err.response;
        toast.error(data["message"]);
        setSpinner(false);
    })
    }
    else {
      toast.error("Passwords doesn't match");
    }
  }
  return (
    <div className='register-wrapper'>
      <ToastContainer />
      {!spinner?<Form className='d-flex flex-column register-inner p-5'>
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
              <Form.Control type="password" placeholder='re-enter password' name="password2" onChange={handleChange} value={formInput["password2"]}/>
          </Form.Group>
          <Form.Group>
          <Button variant="success" className='mx-3' onClick={createUser}>Submit</Button>
            <Button variant='primary' onClick={()=>navigate("/")}>Already a user?</Button>
            </Form.Group>
      </Form>:<Loading />}
      </div>
  )
}
