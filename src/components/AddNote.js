import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'
const AddNote = () => {

  const context = useContext(noteContext);
  const { addNote } = context;
  const [ note, setNote ] = useState({title:"", description:"", tag:""});

  const onChange =(e) =>{
    setNote({...note, [e.target.name]: e.target.value});
  };

  const handleAddNote =(e) =>{
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title:"", description:"", tag:""});
  };

  return (
    <div>
      <div className="container glass-container p-4 w-75 rounded-3 my-3">
        <h1 className='text-center font-heading text-light mt-3'> Add a <span style={{ color: "#04a8e7bf", fontFamily: "headingFont" }}>N</span><span style={{ color: "#fef586", fontFamily: "headingFont" }}>o</span><span style={{ color: "#7bf70abf", fontFamily: "headingFont" }}>t</span><span style={{ color: "#ff5e1e", fontFamily: "headingFont" }}>e</span></h1>
        <div className="underline p-bg-color mx-auto w-25"></div>

        <form action="post">

          <div className="mb-3 inputGreen rounded-1">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" placeholder="Enter a title for your note" onChange={onChange} value={note.title} required minLength={3} maxLength={34}/>
          </div>

          <div className="mb-3 inputBlue rounded-1">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" placeholder="Enter a description for your note" onChange={onChange} value={note.description} required minLength={5} maxLength={175}/>
          </div>

          <div className="mb-3 inputYellow rounded-1">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" placeholder="Enter a tag for your note" onChange={onChange} value={note.tag} required minLength={3} maxLength={20}/>
          </div>

          <div className="mb-3 mt-5 d-flex justify-content-center">
            <button type="submit" className="addnote-btn form-control btn btn-info text-white w-50" disabled={ localStorage.getItem("token")===null || note.title<3 || note.description<5 || note.tag<3 } onClick={handleAddNote}><i className="fa-solid fa-circle-plus me-2"></i>Add Note </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default AddNote
