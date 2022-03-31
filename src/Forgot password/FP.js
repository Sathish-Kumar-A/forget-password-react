import React, { useState } from 'react';
import * as axios from "axios";
import { useNavigate,useLocation } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap'
import { link } from '../config';
import { toast,ToastContainer } from 'react-toastify';
import { Loading } from '../Loading/Loading';

export const FP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location["state"];
  const [token, setToken] = useState("");
  const [spinner, setSpinner] = useState(false);

  const tokenCheck = async () => {
    setSpinner(true);
    const body = { token: token,email:email };
    await axios.put(link+"entertoken", body).then(({data}) => {
      if (data["success"]) {
        navigate("/newpassword",{state:{email:email}});
      }
    })
      .catch(err => {
        const { data } = err.response;
        console.log(data);
        toast.error(data["message"]);
        setSpinner(false);
    })
  }
  return (
    <div className='register-wrapper'>
      <ToastContainer />
      {!spinner?<Form className='register-inner p-5'>
        <h5>A secret key has been sent to your <b>email</b> address which expires in 5 minutes</h5>
        <Form.Group>
          <Form.Control value={token} onChange={(e) => setToken(e.target.value)} placeholder="Enter the secret key" />
          <Button variant='success' className='mt-3' onClick={tokenCheck}>Submit</Button>
        </Form.Group>
      </Form>:<Loading />}
    </div>
  )
}
