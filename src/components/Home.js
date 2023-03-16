import React from 'react'
import Notes from './Notes'
import AddNote from './AddNote'

const Home = (props) => {

  return (
    <div className='home'>

      <h4 className='text-center font-heading text-light blur-lable'>{localStorage.getItem("name")?(<>Welcome to i<span style={{ color: "#0145ff", fontFamily: "headingFont" }}>N</span><span style={{ color: "#fef586", fontFamily: "headingFont" }}>o</span><span style={{ color: "#7bf70abf", fontFamily: "headingFont" }}>t</span><span style={{ color: "#ff5e1e", fontFamily: "headingFont" }}>e</span>book {localStorage.getItem("name")}</>):""}</h4>
      {/* add note*/}
      <AddNote setAlert={props.setAlert}/>

      {/* notes */}
      <Notes setAlert={props.setAlert}/>
    </div>
  )
}

export default Home
