import { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {

  const [notes, setNotes] = useState([]);
  const host = 'http://localhost:4000/api/v1/note';

  // alert method
  const showAlert = (isAlert, alertType, message)=>{
    props.setAlert({ isAlert: isAlert, type: alertType, msg: message });
    setTimeout(() => {
      props.setAlert({ isAlert: false, type: "", msg: "" });
    }, 3000);
  }


  // Fetch all notes
  const fetchAllNotes = async () => {

    //Api call
    const response = await fetch(`${host}/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")
      }
    });
    const json = await response.json();
    setNotes(json);
    console.log(json);
  }
  //-------------------------------------------------------------
  // Add a note
  const addNote = async (title, description, tag) => {

    // server side logic
    // API Call
    const response = await fetch(`${host}/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json);

    // client side logic
    setNotes(notes.concat(json));
    showAlert(true, "success", "Note has been added successfully!");
  }

  //-------------------------------------------------------------
  // Delete a note
  const deleteNote = async (id) => {

    // logic for client side
    setNotes(notes.filter((note) => { return note._id !== id }));

    // logic for server side
    // API Call
    const response = await fetch(`${host}/deleteNote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")
      }
    });
    const json = await response.json();
    console.log(json);
    showAlert(true, "success", "Note has been deleted successfully!");
  }

  //-------------------------------------------------------------
  // Edit a note
  const editNote = async (id, title, description, tag) => {

    // server side logic
    // API Call
    const response = await fetch(`${host}/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json);
    showAlert(true, "success", "Note has been edited successfully!");

    // client side logic
    // creating a copy array
    let newNotes = await JSON.parse(JSON.stringify(notes));

    // iterating through the notes and updating
    for (let i = 0; i < newNotes.length; i++) {
      const note = newNotes[i];
      if (note._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }
  //-------------------------------------------------------------

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, fetchAllNotes, editNote, deleteNote, showAlert }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;