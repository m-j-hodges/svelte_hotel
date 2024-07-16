import React, {useState} from 'react';
import { LOGIN_USER } from '../utils/mutations';
import Header from './header'
import {useMutation}  from '@apollo/client'
import AuthService from '../utils/auth'

const Login = ({props, orders}) => {

const [loginForm, setLoginForm] = useState({username:'', password:''})
const [loginUser, {error, data}] = useMutation(LOGIN_USER)
const [lengthAlert, setLengthAlert] = useState(false)
const [passwordAlert, setPasswordAlert] = useState('password is too short!')

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

 try{ 
  const {data} = await loginUser({
    variables: {...loginForm}

  })
  AuthService.login(data.loginUser.token)
} catch {
    setPasswordAlert('entered password is incorrect!')
    setLengthAlert(true)
  }
}



return(
  <div> 
    
    <Header orders={orders}/>
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
      {lengthAlert ? <div className={passwordAlert == 'password is too short!' ? 'alert alert-warning' : 'alert alert-danger' }> {passwordAlert} </div> : ''}
      <button onClick={() => LoginUser()} className="btn btn-secondary w-75 p-3 m-3 d-block" type="button">submit</button>
      <small> <a href="/Register">don't have an account? click here. </a></small>
    </div>
    <div className="col-4"></div>
    </div>
  </div>

)
}
export default Login;