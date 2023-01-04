import React, {useState} from 'react';
import { LOGIN_USER } from '../utils/mutations';
import Header from './header'
import {useMutation}  from '@apollo/client'
import AuthService from '../utils/auth'

const Login = ({props}) => {

  
const [loginForm, setLoginForm] = useState({username:'', password:''})
const [loginUser, {error, data}] = useMutation(LOGIN_USER)
const [lengthAlert, setLengthAlert] = useState(false)

const updateForm = (e) => {
  const {name, value} = e.target
  if(name === "password" && value.length < 8) {
      setLengthAlert(true)
    }
  else if(name === "password" && value.length >= 8) {
    setLengthAlert(false)
    setLoginForm({...loginForm,[name]: value,})
  }
  else if(name === "username") {
    setLoginForm({...loginForm,[name]: value,})
  }
  }



const LoginUser = async () => {
  const {data} = await loginUser({
    variables: {...loginForm}

  })
  console.log(data)
  AuthService.login(data.loginUser.token)
}


return(
  <div> 
    
    <Header />
    <div className="space"></div>
    <div className="row">
    <div className="col-4"></div>
    <div className="form-group col-4 custom-back">
    <h3 className="text-center m-3 custom-header"> Login</h3>
    {props ? <div className="alert alert-warning"> {props}</div> :''}
      <label className="px-3 d-inline" htmlFor="usernameField">Username:</label>
      <input onChange={(e)=> updateForm(e)} id="usernameField" className="form-control my-3 w-50 d-inline" name="username" placeholder="enter Username"></input>
      <br></br>
      <label className="px-3 d-inline" htmlFor="passwordField">Password:</label>
      <input onChange={(e)=> updateForm(e)} className="form-control my-3 w-50 d-inline" type="password" name="password" placholder="***"></input>
      {lengthAlert ? <div className="alert alert-warning"> Password too short! </div> : ''}
      <button onClick={() => LoginUser()} className="btn btn-secondary p-1 m-3 d-block" type="button">submit</button>
      <small> <a href="/Register">don't have an account? click here. </a></small>
    </div>
    <div className="col-4"></div>
    </div>
  </div>

)
}
export default Login;