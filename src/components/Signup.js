import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ fname: "", lname: "", email: "", password: "", cpassword: "" });
  const navigate = useNavigate();
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const handleSignup = async (e) => {
    e.preventDefault();
    // server side logic
    // API Call
    if (credentials.password === credentials.cpassword) {
      const response = await fetch("http://localhost:4000/api/v1/auth/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fname: credentials.fname, lname: credentials.lname, email: credentials.email, password: credentials.password })
      });
      const json = await response.json();
      console.log(json);

      if (json.success) {
        // save the auth token and redirect
        localStorage.setItem("token" , json.token);
        // redirect
        navigate('/login');
        // throwing alert
        props.setAlert({ isAlert: true, type: "success", msg: "Account created successfully, Please login to access inotebook services!" });
        // resetting alert
        setTimeout(() => {
          props.setAlert({ isAlert: false, type: "", msg: "" });
        }, 5000);
      } else {
        props.setAlert({ isAlert: true, type: "danger", msg: json.error });
        // resetting alert
        setTimeout(() => {
          props.setAlert({ isAlert: false, type: "", msg: "" });
        }, 3000);
      }
    } else {
      props.setAlert({ isAlert: true, type: "danger", msg: "Password & Confirm password must be same!" });
      // resetting alert
      setTimeout(() => {
        props.setAlert({ isAlert: false, type: "", msg: "" });
      }, 3000);
    }

  }
  return (
    <div className='signup'>
      <div className="container glass-container p-4 w-75 rounded-3">
        <h1 className='text-center font-heading text-light mt-3'>Create an i<span style={{ color: "#04a8e7bf", fontFamily: "headingFont" }}>N</span><span style={{ color: "#fef586", fontFamily: "headingFont" }}>o</span><span style={{ color: "#7bf70abf", fontFamily: "headingFont" }}>t</span><span style={{ color: "#ff5e1e", fontFamily: "headingFont" }}>e</span>book account</h1>
        <div className="underline p-bg-color mx-auto w-50"></div>

        <form action="post">

          <div className="mb-3 inputGreen rounded-1">
            <label htmlFor="fname" className="form-label">First Name</label>
            <input type="text" className="form-control" id="fname" name="fname" value={credentials.fname} onChange={onChange} placeholder="Enter your first name" />
          </div>

          <div className="mb-3 inputGreen rounded-1">
            <label htmlFor="lname" className="form-label">Last Name</label>
            <input type="text" className="form-control" id="lname" name="lname" value={credentials.lname} onChange={onChange} placeholder="Enter your last name" />
          </div>

          <div className="mb-3 inputBlue rounded-1">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} placeholder="Enter your email id" />
          </div>

          <div className="mb-3 inputYellow rounded-1">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} placeholder="Enter a password" />
          </div>

          <div className="mb-3 inputYellow rounded-1">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="cpassword" name="cpassword" value={credentials.cpassword} onChange={onChange} placeholder="Confirm your password" />
          </div>

          <div className="mb-3 mt-5 d-flex justify-content-center">
            <button type="submit" className="btn-login form-control btn btn-info text-white w-50" disabled={ credentials.fname<3 || credentials.lname<3 || credentials.email<8 || credentials.password<5 || credentials.cpassword<5 } onClick={handleSignup}>Sign up</button>
          </div>

          <div className="text-center my-3"><Link className="text-decoration-none text-white alreadyac-link" to="/login">Already have an account?</Link></div>

        </form>
      </div>
    </div>
  )
}

export default Signup
