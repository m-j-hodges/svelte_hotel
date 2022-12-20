import React, {useState} from 'react';
import Header from './header'

const Login = () => {

  const [loginName, setloginName] = useState('')
  


return(
  <div> 
    
    <br></br>
    <Header />
    <div className="space"></div>
    <div className="row">
    <div className="col-4"></div>
    <div className="form-group col-4 custom-back">
    <h3 className="text-center m-3 custom-header"> Login</h3>
      <label className="px-3 d-inline"for="emailField">Email:</label>
      <input id="emailfield" className="form-control my-3 w-50 d-inline" type="email" placeholder="email@email.com"></input>
      <br></br>
      <label className="px-3 d-inline" for="passwordField">Password:</label>
      <input className="form-control my-3 w-50 d-inline" type="password" placholder="***"></input>
      <button className="btn btn-secondary p-1 m-3 d-block" type="button">submit</button>
      <small> <a href="/Register">don't have an account? click here. </a></small>
    </div>
    <div className="col-4"></div>
    </div>
  </div>

)
}
export default Login;