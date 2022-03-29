import React, { useState,useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import * as axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { link } from "../config";


export const Login = () => {
    const navigate = useNavigate();
    const [formInput, setFormInput] = useState({
        email: "",
        password: ""
    })
    const emailRef = useRef("");
    const handleChange = (e) => {
        let name = e.target.name;
        setFormInput({ ...formInput, [name]: e.target.value });
    }
    const login = async () => {
        // const body = { email: formInput["email"], password: formInput["password"] };
        await axios.get(link+"login", {
            headers: {
                email: formInput["email"],
                password: formInput["password"]
            }
        }).then(({data}) => {
            if (data["success"]) {
                toast.success("Logged in successfully");
            }
        })
            .catch((err) => {
                if (err.response.status === 401) {
                    toast.error("Invalid Credentials");
                }
            })
        // console.log(data);
        // if (data["success"]) {
        //     toast.success("Logged in successfully");
        // else {
        //     toast.error("Invalid credentials");
        // }
    }
    const sendEmail = async () => {
        if (emailRef.current.value.length > 7 && emailRef.current.value.includes("@")) {
            const body={email:formInput['email']}
        await axios.put(link + "sendmail", body).then(({ data }) => {
            toast.success("The secret key has been sent to your mail");
        })
            .catch(err => {
                const { data } = err.response;
                toast.error(data["message"]);
            })
        
        setTimeout(()=>navigate("/forgotpassword",{state:{email:formInput["email"]}}),1000)
        }
        else {
            toast.error("Enter email address to receive the secret key")
        }
    }
    return (
        <div className='register-wrapper' >
            <ToastContainer />
      <Form className='d-flex flex-column register-inner p-5'>
          <Form.Group className='mb-3'>
              <Form.Label>Email</Form.Label>
                    <Form.Control type='email' placeholder='enter your email' name="email" onChange={handleChange} value={formInput["email"]} ref={emailRef}/>
              <Form.Text className='text-muted'>Your email is safe with as</Form.Text>
          </Form.Group>

          <Form.Group className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder='enter password' name="password" onChange={handleChange} value={formInput["password"]}/>
          </Form.Group>
          <Form.Group>
          <Button variant="success" className='mx-3' onClick={login}>Submit</Button>
              <Button variant='warning' className='mx-2' onClick={sendEmail}>Forgot password ?</Button>
              <Button variant='info' className='mx-3' onClick={()=>navigate("/register")}>New user?</Button>
            </Form.Group>
            </Form>
            </div>
  )
}
