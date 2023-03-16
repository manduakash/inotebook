import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const Login = (props) => {
  const [ credentials, setCredentials ] = useState({email: "", password: ""});
  const navigate = useNavigate();
  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }
  const handleLogin = async (e)=>{
    e.preventDefault();
    // server side logic
    // API Call
    const response = await fetch("http://localhost:4000/api/v1/auth/login", {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
      },
    body: JSON.stringify({email: credentials.email, password: credentials.password})
  });
  const json =await response.json();

  if(json.success){
    // save the auth token and redirect
    localStorage.setItem("token", json.token);
    localStorage.setItem("name", json.name);
    navigate('/');
    props.setAlert({isAlert: true, type: "success", msg: "Your are logged in successfully"});
    // resetting alert
    setTimeout(() => {
    props.setAlert({isAlert: false, type: "", msg: ""});
    }, 3000);
  }else{
    props.setAlert({isAlert: true, type: "danger", msg: json.error});
    // resetting alert
    setTimeout(() => {
    props.setAlert({isAlert: false, type: "", msg: ""});
    }, 3000);
  }
}

  return (
    <div className='login'>
      <div className="container glass-container p-4 w-75 rounded-3">
        <h1 className='text-center font-heading text-light mt-3'>Login to i<span style={{ color: "#04a8e7bf", fontFamily: "headingFont" }}>N</span><span style={{ color: "#fef586", fontFamily: "headingFont" }}>o</span><span style={{ color: "#7bf70abf", fontFamily: "headingFont" }}>t</span><span style={{ color: "#ff5e1e", fontFamily: "headingFont" }}>e</span>book </h1>
        <div className="underline p-bg-color mx-auto w-25"></div>

        <form action="post">

          <div className="mb-3 inputBlue rounded-1">
            <label htmlFor="login-email" className="form-label">Email</label>
            <input type="email" className="form-control" id="login-email" name="email" value={credentials.email} onChange={onChange} placeholder="Enter your email id" />
          </div>
          <div className="mb-3 inputYellow rounded-1">
            <label htmlFor="login-password" className="form-label">Password</label>
            <input type="password" className="form-control" id="login-password" name="password" value={credentials.password} onChange={onChange} placeholder="Enter your password" />
          </div>

          <div className="mb-3 mt-5 d-flex justify-content-center">
            <button type="submit" className="btn-login form-control btn btn-info text-white w-50" onClick={handleLogin}>Login</button>
          </div>

          <div className="text-center my-3"><Link className="text-decoration-none text-white createac-link" to="/signup">Create a new account</Link></div>

        </form>
      </div>
    </div>
  )
}

export default Login
