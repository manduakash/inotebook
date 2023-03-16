import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Home from "./components/Home.js";
import About from "./components/About.js";
import Contact from "./components/Contact.js";
import Services from "./components/Services.js";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import React, { useState } from 'react'
import Login from './components/Login';
import Signup from './components/Signup';


function App() {
  const [alert, setAlert] = useState(null);
  return (
    <div className='app'>
      <NoteState setAlert={setAlert}>
        <Router>
          <Navbar />
          {alert && (<Alert alert={alert} />)}
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/home' element={<Home />} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/contact' element={<Contact />} />
            <Route exact path='/services' element={<Services />} />
            <Route exact path='/login' element={<Login setAlert={setAlert}/>} />
            <Route exact path='/signup' element={<Signup setAlert={setAlert}/>} />
          </Routes>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
