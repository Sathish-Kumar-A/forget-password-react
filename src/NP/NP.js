import React, { useState } from 'react';
import { Button, Form} from 'react-bootstrap';
import { useNavigate,useLocation } from 'react-router-dom';
import { link } from '../config';
import * as axios from "axios";
import { toast,ToastContainer } from 'react-toastify';

export const NP = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { email } = location['state'];
    const [password, setPassword] = useState({
        password: "",
        password2: ""
    });
    const handleChange = (e) => {
        let name = e.target.name;
        setPassword({ ...password, [name]: e.target.value });
    }
    const passwordSet = async () => {
        if (password['password'] === password["password2"]) {
            const body = {
                email: email,
                password:password["password"]
            }
            await axios.put(link + "changepassword", body).then(({data}) => {
                if (data['success']) {
                    toast.success("Your password has been changed successfully");
                    setTimeout(()=>navigate("/"),2000)
                }
            }).catch((err) => {
                const { data } = err.response;
                toast.error(data["message"]);
            });
        }
        else {
            toast.error("Passwords doesn't match");
        }
    }

  return (
      <div className='register-wrapper'>
          <ToastContainer />
          <Form className='register-inner p-5'>
              <Form.Group>
                  <Form.Label>New password</Form.Label>
                  <Form.Control value={password["password"]} name="password" onChange={handleChange}/>
              </Form.Group>
              <Form.Group>
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control value={password["password2"]} name="password2" onChange={handleChange}/>
              </Form.Group>
              <Button variant="success" className='my-3' onClick={passwordSet}>Enter</Button>
          </Form>
    </div>
  )
}
