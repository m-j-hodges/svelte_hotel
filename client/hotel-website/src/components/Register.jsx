import React, {useDebugValue, useState} from 'react';
import Header from './header'
import {useMutation} from '@apollo/client'
import Axios from 'axios';
import {REGISTER_MUT} from '../utils/mutations'
import AuthService from '../utils/auth'
import { useEffect } from 'react';


const Register = ({orders}) => {


const [alertMsg, setAlertMsg] = useState('')
const [passAlert, setPassAlert] = useState('')
const [registerNotify, setregisterNotify] = useState('')

const [registerForm, setRegisterForm] = useState({username: '',password: '', email: ''})
const [regUser, { error, data }] = useMutation(REGISTER_MUT);

function validateStr(str) {
  if(str.length === 0) {
    setAlertMsg('enter a longer username.')
  }
}

const validatePassword = (e) => {
  const {name, value} = e.target
  const regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
 if(name == 'email' && value.match(regex)) {
    setRegisterForm({...registerForm,[name]: value,})
 }
else if(name === 'password') {
  setRegisterForm({...registerForm,[name]: value,})
 } 
else if(name === 'username') {
  setRegisterForm({...registerForm,[name]: value,})
 }
  
};

const submitForm = async (e) => {
  e.preventDefault();
  const {data} = await regUser({
    variables: {...registerForm}
  })
  console.log(data)
  AuthService.login(data.Register.token)
  if (data.register.token) {setregisterNotify('You have successfully been logged in!')}
  else {setregisterNotify('There was an error in logging you in!')}
}

useEffect(() => {
  const clearNotify = setInterval(() => {
    setregisterNotify('')
    
  }, 5000)
return () => clearInterval(clearNotify)

}, []);

  return(
    <>
    <Header orders={orders}/>
    <div className="space"></div>
    <div className="row">
    <div className="col-4"></div>
    <div className="form-group col-4 custom-back">
    <h3 className="text-center m-3 custom-header"> Register</h3>
      <label className="px-3 d-inline"for="emailField">Email:</label>
      <input id="emailfield" name="email" onChange={(e) => validatePassword(e)} className="form-control my-3 w-50 d-inline" type="email" placeholder="email@email.com"></input>
      <br></br>
      <label className="px-3 d-inline" for="userNameField">username:</label>
      <input id="userNameField" name="username" onChange={(e)=> validatePassword(e)} className="form-control my-3 w-50 d-inline" type="input"></input>
      <small className="d-block">{alertMsg}</small>
      <label className="px-3 d-inline" for="passwordField">Password:</label>
      <input className="form-control my-3 w-50 d-inline" name="password" onChange={(e)=> validatePassword(e)} type="password" placholder="***"></input>
      <small className="d-block">{passAlert}</small>
      <button className="btn btn-secondary p-2 m-3 d-block" onClick={(e)=> submitForm(e)} type="button">create account</button>
      {registerNotify ? <div className="alert alert-success">${registerNotify}</div> : registerNotify}
    </div>
    <div className="col-4"></div>
    </div>

    
    
    </>

  )
}

export default Register;
