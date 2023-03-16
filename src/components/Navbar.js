import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import noteContext from '../context/notes/noteContext';

const Navbar = () => {

  const context = useContext(noteContext);
  let location = useLocation();
  const navigate = useNavigate();
  const [ token , setToken ] = useState(null);

  // logic for logout
  const logout = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/");
    context.showAlert(true, "success", "You are logged out successfully!");
  }

  useEffect(()=>{
    setToken(localStorage.getItem("token"))
    // eslint-disable-next-line
  },[logout])

  return (
    <>
      <nav className="navbar navbar-expand-lg py-1 navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand fs-6 font-cursive" to="/">
            <i className="fa-solid fa-file-pen me-1 fs-6"></i>
            <span className='p-color fs-5 fw-bold font-monospace'>i</span>Notebook
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-item-end">

              <li className="nav-item me-2 ms-md-5 mx-sm-auto">
                <Link className={`nav-link ${location.pathname === "/home" ? "active" : ""}`} aria-current="page" to="/home">Home</Link>
              </li>

              <li className="nav-item me-2">
                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
              </li>

              <li className="nav-item me-2">
                <Link className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`} to="/contact">Contact</Link>
              </li>

              <li className="nav-item me-2">
                <Link className={`nav-link ${location.pathname === "/services" ? "active" : ""}`} to="/services">Services</Link>
              </li>

            </ul>
            <div className="d-flex">
              {!token?(<><Link className="btn-login btn btn-sm btn-outline-info text-white mx-1" to="/login" role="button">Log in</Link>
                <Link className="btn-signup btn btn-sm btn-info text-white mx-1" to="/signup" role="button">Sign up</Link></>)
              : (<button className="btn-logout btn btn-sm btn-outline-danger text-white" onClick={logout}>Log out</button>)}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
