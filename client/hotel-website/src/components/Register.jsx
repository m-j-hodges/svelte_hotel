import React, {useState} from 'react';
import Header from './header'
import Axios from 'axios';

const Register = () => {

const [userName, setUserName] = useState('')
const [alertMsg, setAlertMsg] = useState('')
const [passAlert, setPassAlert] = useState('')
const [password, setPassword] = useState('')
const [email, setEmail] = useState('')

function validateStr(str) {
  if(str.length === 0) {
    setAlertMsg('enter a longer username.')
  }
  else {
    setUserName(str)
    setAlertMsg('')
  }
}

function validatePassword(pass) {
  if(pass.length < 8 && pass.length !== 0) {
    setPassAlert('password length is too short.')
  }
  else {
    setPassword(pass)
    setPassAlert('')
  }
}

const packetizeIt = () => {
  if( password > 8 && userName !== null) {
    Axios.post('/user', {
      username: userName,
      password: password,
      email: email
    })

  }

}

  return(
    <>
    <Header />
    <div className="space"></div>
    <div className="row">
    <div className="col-4"></div>
    <div className="form-group col-4 custom-back">
    <h3 className="text-center m-3 custom-header"> Register</h3>
      <label className="px-3 d-inline"for="emailField">Email:</label>
      <input id="emailfield" className="form-control my-3 w-50 d-inline" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email@email.com"></input>
      <br></br>
      <label className="px-3 d-inline" for="userNameField">username:</label>
      <input id="userNameField" onChange={(e) => validateStr(e.target.value)} className="form-control my-3 w-50 d-inline" type="input"></input>
      <small className="d-block">{alertMsg}</small>
      <label className="px-3 d-inline" for="passwordField">Password:</label>
      <input className="form-control my-3 w-50 d-inline" onChange={(e)=> validatePassword(e.target.value)} type="password" placholder="***"></input>
      <small className="d-block">{passAlert}</small>
      <button className="btn btn-secondary p-2 m-3 d-block" onClick={() => packetizeIt()} type="button">create account</button>
    </div>
    <div className="col-4"></div>
    </div>

    
    
    </>

  )
}

export default Register;
